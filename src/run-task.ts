import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { EcsTask } from '@aws-cdk/aws-events-targets';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { Construct } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';


export interface RunTaskProps {
  /**
   * The VPC for the Amazon ECS task
   * @default - create a new VPC or use existing one
   */
  readonly vpc?: ec2.IVpc;
  /**
   * The Amazon ECS Cluster
   * @default - create a new cluster
   */
  readonly cluster?: ecs.ICluster;
  /**
   * The Amazon ECS Task definition for AWS Fargate
   */
  readonly task: ecs.FargateTaskDefinition;
  /**
   * run it at once(immediately after deployment)
   * @default true
   */
  readonly runAtOnce?: boolean;
  /**
   * run the task with defined schedule
   * @default - no shedule
   */
  readonly schedule?: Schedule;
  /**
   * Log retention days
   * @default - one week
   */
  readonly logRetention?: RetentionDays;
}

export class RunTask extends Construct {
  readonly vpc: ec2.IVpc;
  readonly cluster: ecs.ICluster;
  constructor(scope: Construct, id: string, props: RunTaskProps) {
    super(scope, id);

    // const stack = Stack.of(this);
    const vpc = props.vpc ?? props.cluster ? props.cluster!.vpc : getOrCreateVpc(this);
    const cluster = props.cluster ?? new ecs.Cluster(this, 'Cluster', { vpc });
    const task = props.task;
    this.vpc = vpc;
    this.cluster = cluster;

    if (props.schedule) {
      new Rule(this, 'ScheduleRule', {
        schedule: props.schedule,
        targets: [
          new EcsTask({
            cluster,
            taskDefinition: task,
          }),
        ],
      });
    }

    if (props.runAtOnce !== false) {
      const onEvent = {
        service: 'ECS',
        action: 'runTask',
        parameters: {
          cluster: cluster.clusterName,
          taskDefinition: task.taskDefinitionArn,
          launchType: 'FARGATE',
          networkConfiguration: {
            awsvpcConfiguration: {
              assignPublicIp: 'DISABLED',
              subnets: vpc.selectSubnets({
                subnetType: ec2.SubnetType.PRIVATE,
              }).subnetIds,
            },
          },
        },
        physicalResourceId: cr.PhysicalResourceId.of(task.taskDefinitionArn),
      };
      const runTaskResource = new cr.AwsCustomResource(this, 'EcsRunTask', {
        onCreate: onEvent,
        onUpdate: onEvent,
        policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [task.taskDefinitionArn] }),
        logRetention: props.logRetention ?? RetentionDays.ONE_WEEK,
      });

      // allow lambda from custom resource to iam:PassRole on the ecs task role and execution role
      task.taskRole.grantPassRole(runTaskResource.grantPrincipal);
      if (task.executionRole) task.executionRole.grantPassRole(runTaskResource.grantPrincipal);
      // new CfnOutput(stack, `TaskDefinitionArn-${id}`, { value: task.taskDefinitionArn });
    }

  }
}

function getOrCreateVpc(scope: Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}
