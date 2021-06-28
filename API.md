# API Reference

**Classes**

Name|Description
----|-----------
[RunTask](#cdk-fargate-run-task-runtask)|*No description*


**Structs**

Name|Description
----|-----------
[RunTaskProps](#cdk-fargate-run-task-runtaskprops)|*No description*


**Enums**

Name|Description
----|-----------
[LaunchType](#cdk-fargate-run-task-launchtype)|*No description*
[PlatformVersion](#cdk-fargate-run-task-platformversion)|Fargate platform version.



## class RunTask  <a id="cdk-fargate-run-task-runtask"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConnectable](#aws-cdk-aws-ec2-iconnectable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new RunTask(scope: Construct, id: string, props: RunTaskProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RunTaskProps](#cdk-fargate-run-task-runtaskprops)</code>)  *No description*
  * **task** (<code>[FargateTaskDefinition](#aws-cdk-aws-ecs-fargatetaskdefinition)</code>)  The Amazon ECS Task definition for AWS Fargate. 
  * **capacityProviderStrategy** (<code>Array<[CapacityProviderStrategy](#aws-cdk-aws-ecs-capacityproviderstrategy)></code>)  The capacity provider strategy to run the fargate task; __*Default*__: No capacity provider strategy defined. Use LaunchType instead.
  * **cluster** (<code>[ICluster](#aws-cdk-aws-ecs-icluster)</code>)  The Amazon ECS Cluster. __*Default*__: create a new cluster
  * **fargatePlatformVersion** (<code>[PlatformVersion](#cdk-fargate-run-task-platformversion)</code>)  Fargate platform version. __*Default*__: LATEST
  * **launchType** (<code>[LaunchType](#cdk-fargate-run-task-launchtype)</code>)  Luanch Type of the task. __*Default*__: FARGATE
  * **logRetention** (<code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code>)  Log retention days. __*Default*__: one week
  * **runAtOnce** (<code>boolean</code>)  run it at once(immediately after deployment). __*Default*__: true
  * **runOnResourceUpdate** (<code>boolean</code>)  run the task again on the custom resource update. __*Default*__: false
  * **schedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  run the task with defined schedule. __*Default*__: no shedule
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  fargate security group. __*Default*__: create a default security group
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The VPC for the Amazon ECS task. __*Default*__: create a new VPC or use existing one



### Properties


Name | Type | Description 
-----|------|-------------
**cluster** | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | <span></span>
**connections** | <code>[Connections](#aws-cdk-aws-ec2-connections)</code> | makes RunTask "connectable".
**securityGroup** | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | fargate task security group.
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>
**runOnceResource**? | <code>[AwsCustomResource](#aws-cdk-custom-resources-awscustomresource)</code> | The custom resource of the runOnce execution.<br/>__*Optional*__



## struct RunTaskProps  <a id="cdk-fargate-run-task-runtaskprops"></a>






Name | Type | Description 
-----|------|-------------
**task** | <code>[FargateTaskDefinition](#aws-cdk-aws-ecs-fargatetaskdefinition)</code> | The Amazon ECS Task definition for AWS Fargate.
**capacityProviderStrategy**? | <code>Array<[CapacityProviderStrategy](#aws-cdk-aws-ecs-capacityproviderstrategy)></code> | The capacity provider strategy to run the fargate task;<br/>__*Default*__: No capacity provider strategy defined. Use LaunchType instead.
**cluster**? | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | The Amazon ECS Cluster.<br/>__*Default*__: create a new cluster
**fargatePlatformVersion**? | <code>[PlatformVersion](#cdk-fargate-run-task-platformversion)</code> | Fargate platform version.<br/>__*Default*__: LATEST
**launchType**? | <code>[LaunchType](#cdk-fargate-run-task-launchtype)</code> | Luanch Type of the task.<br/>__*Default*__: FARGATE
**logRetention**? | <code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code> | Log retention days.<br/>__*Default*__: one week
**runAtOnce**? | <code>boolean</code> | run it at once(immediately after deployment).<br/>__*Default*__: true
**runOnResourceUpdate**? | <code>boolean</code> | run the task again on the custom resource update.<br/>__*Default*__: false
**schedule**? | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | run the task with defined schedule.<br/>__*Default*__: no shedule
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | fargate security group.<br/>__*Default*__: create a default security group
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The VPC for the Amazon ECS task.<br/>__*Default*__: create a new VPC or use existing one



## enum LaunchType  <a id="cdk-fargate-run-task-launchtype"></a>



Name | Description
-----|-----
**FARGATE** |
**EXTERNAL** |


## enum PlatformVersion  <a id="cdk-fargate-run-task-platformversion"></a>

Fargate platform version.

Name | Description
-----|-----
**V1_3_0** |
**V1_4_0** |
**LATEST** |


