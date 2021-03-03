# API Reference

**Classes**

Name|Description
----|-----------
[RunTask](#cdk-fargate-run-task-runtask)|*No description*


**Structs**

Name|Description
----|-----------
[RunTaskProps](#cdk-fargate-run-task-runtaskprops)|*No description*



## class RunTask  <a id="cdk-fargate-run-task-runtask"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new RunTask(scope: Construct, id: string, props: RunTaskProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RunTaskProps](#cdk-fargate-run-task-runtaskprops)</code>)  *No description*
  * **task** (<code>[FargateTaskDefinition](#aws-cdk-aws-ecs-fargatetaskdefinition)</code>)  The Amazon ECS Task definition for AWS Fargate. 
  * **cluster** (<code>[ICluster](#aws-cdk-aws-ecs-icluster)</code>)  The Amazon ECS Cluster. __*Default*__: create a new cluster
  * **logRetention** (<code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code>)  Log retention days. __*Default*__: one week
  * **runAtOnce** (<code>boolean</code>)  run it at once(immediately after deployment). __*Default*__: true
  * **runOnResourceUpdate** (<code>boolean</code>)  run the task again on the custom resource update. __*Default*__: false
  * **schedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  run the task with defined schedule. __*Default*__: no shedule
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The VPC for the Amazon ECS task. __*Default*__: create a new VPC or use existing one



### Properties


Name | Type | Description 
-----|------|-------------
**cluster** | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | <span></span>
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>



## struct RunTaskProps  <a id="cdk-fargate-run-task-runtaskprops"></a>






Name | Type | Description 
-----|------|-------------
**task** | <code>[FargateTaskDefinition](#aws-cdk-aws-ecs-fargatetaskdefinition)</code> | The Amazon ECS Task definition for AWS Fargate.
**cluster**? | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | The Amazon ECS Cluster.<br/>__*Default*__: create a new cluster
**logRetention**? | <code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code> | Log retention days.<br/>__*Default*__: one week
**runAtOnce**? | <code>boolean</code> | run it at once(immediately after deployment).<br/>__*Default*__: true
**runOnResourceUpdate**? | <code>boolean</code> | run the task again on the custom resource update.<br/>__*Default*__: false
**schedule**? | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | run the task with defined schedule.<br/>__*Default*__: no shedule
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The VPC for the Amazon ECS task.<br/>__*Default*__: create a new VPC or use existing one



