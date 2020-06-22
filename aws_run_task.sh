export AWS_DEFAULT_REGION=us-east-1
export AWS_NETWORK_CONFIG="awsvpcConfiguration={subnets=[subnet-306cb96f,subnet-77a97f56],securityGroups=[sg-0b1313cd912d9411e],assignPublicIp=ENABLED}"
export AWS_CLUSTER=pepper-garden
export AWS_TASK_DEFINITION=pepper-garden

 echo "Exporting AWS_DEFAULT_REGION"
 echo AWS_DEFAULT_REGION ${AWS_DEFAULT_REGION}
 echo AWS_NETWORK_CONFIG ${AWS_NETWORK_CONFIG}
 echo AWS_CLUSTER ${AWS_CLUSTER}
 echo "ECR run-task"
 aws ecs run-task --cluster "${AWS_CLUSTER}" \
 --task-definition "${AWS_TASK_DEFINITION}" \
 --launch-type FARGATE \
 --network-configuration "${AWS_NETWORK_CONFIG}" \

echo "aws run task is now deploying"
