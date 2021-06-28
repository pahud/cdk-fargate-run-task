import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { Schedule } from '@aws-cdk/aws-events';
import { LogGroup, RetentionDays } from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';
import { LaunchType, RunTask } from './run-task';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    };

    const stack = new cdk.Stack(app, 'run-task-demo-stack', { env });

    const task = new ecs.FargateTaskDefinition(stack, 'Task', { cpu: 256, memoryLimitMiB: 512 });

    task.addContainer('Ping', {
      image: ecs.ContainerImage.fromRegistry('busybox'),
      command: [
        'sh', '-c',
        'ping -c 3 google.com',
      ],
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'Ping',
        logGroup: new LogGroup(stack, 'LogGroup', {
          retention: RetentionDays.ONE_DAY,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        }),
      }),
    });

    // deploy and run this task once
    const runTaskAtOnce = new RunTask(stack, 'RunDemoTaskOnce', {
      task,
      capacityProviderStrategy: [
        {
          capacityProvider: 'FARGATE_SPOT',
          weight: 1,
        },
      ],
    });

    // or run it with schedule(every hour 0min)
    new RunTask(stack, 'RunDemoTaskEveryHour', {
      task,
      cluster: runTaskAtOnce.cluster,
      runAtOnce: false,
      schedule: Schedule.cron({ minute: '0' }),
    });

    const vpc = getOrCreateVpc(stack);
    const existingCluster = ecs.Cluster.fromClusterAttributes(stack, 'ExistingCluster', {
      clusterName: 'fargate',
      vpc,
      securityGroups: [new ec2.SecurityGroup(stack, 'DummySG', { vpc })],
    });

    const externalTask = new ecs.TaskDefinition(stack, 'ExternalTask', {
      cpu: '256',
      memoryMiB: '512',
      compatibility: ecs.Compatibility.EXTERNAL,
    });

    externalTask.addContainer('ExternalPing', {
      image: ecs.ContainerImage.fromRegistry('busybox'),
      command: [
        'sh', '-c',
        'ping -c 3 google.com',
      ],
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'Ping',
        logGroup: new LogGroup(stack, 'ExternalLogGroup', {
          retention: RetentionDays.ONE_DAY,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        }),
      }),
    });

    // run it once on external instance
    new RunTask(stack, 'RunDemoTaskFromExternal', {
      task: externalTask,
      cluster: existingCluster,
      launchType: LaunchType.EXTERNAL,
    });

    // run it by schedule  on external instance
    new RunTask(stack, 'RunDemoTaskFromExternalSchedule', {
      task: externalTask,
      cluster: existingCluster,
      launchType: LaunchType.EXTERNAL,
      runAtOnce: false,
      schedule: Schedule.cron({ minute: '0' }),
    });

    app.synth();
    this.stack = [stack];
  }
}

new IntegTesting;

function getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1'
    || process.env.CDK_USE_DEFAULT_VPC === '1' ? ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}
