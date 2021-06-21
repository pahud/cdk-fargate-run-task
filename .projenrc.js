const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  authorAddress: 'pahudnet@gmail.com',
  authorName: 'Pahud',
  cdkVersion: '1.73.0',
  name: 'cdk-fargate-run-task',
  defaultReleaseBranch: 'main',
  description: 'Define and run container tasks on AWS Fargate immediately or with schedule',
  repository: 'https://github.com/pahud/cdk-fargate-run-task.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-logs',
    '@aws-cdk/custom-resources',
  ],
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
  python: {
    distName: 'cdk-fargate-run-task',
    module: 'cdk_fargate_run_task',
  },
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  keywords: [
    'cdk',
    'fargate',
    'task',
    'ecs',
    'aws',
  ],
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
