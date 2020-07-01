# Log In to AWS and Docker
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 641570163578.dkr.ecr.us-east-1.amazonaws.com

# Build project
docker build -t pepper-garden .

# Tag repository
docker tag pepper-garden:latest 641570163578.dkr.ecr.us-east-1.amazonaws.com/pepper-garden:latest

# Push
docker push 641570163578.dkr.ecr.us-east-1.amazonaws.com/pepper-garden:latest
