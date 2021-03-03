import * as ecs from '@aws-cdk/aws-ecs';
import { Schedule } from '@aws-cdk/aws-events';
import { LogGroup, RetentionDays } from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';
import { RunTask } from './run-task';

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
    const runTaskAtOnce = new RunTask(stack, 'RunDemoTaskOnce', { task });

    // or run it with schedule(every hour 0min)
    new RunTask(stack, 'RunDemoTaskEveryHour', {
      task,
      cluster: runTaskAtOnce.cluster,
      runAtOnce: false,
      schedule: Schedule.cron({ minute: '0' }),
    });

    app.synth();
    this.stack = [stack];
  }
}

new IntegTesting;
