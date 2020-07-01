export AWS_DEFAULT_REGION=us-east-1
export AWS_NETWORK_CONFIG="awsvpcConfiguration={subnets=[subnet-17eb3736,subnet-a436d395],securityGroups=[sg-0cfd6d1ab46e0c438],assignPublicIp=ENABLED}"
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
