# [Docker](#Docker) and [AWS](#AWS)

## **Docker**
### Docker Requirements
* WSL2
* Windows 10 (version 2004)
* Docker Desktop

###Table of Contents
1. [Installation](#Installation)
2. [Commands](#Commands)

### **Installation**
Enable WSL in PowerShell
```js
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
Update to Windows 10 2004 if you are not already.

Enable Virtual Machine Plaform in PowerShell
```js
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Set WSL default version to 2
```js
wsl --set-default-version 2
```

Install desired Linux Distribution from the Windows Store
- I like Ubuntu and the following Linux commands will be Ubuntu focused, but the choice is yours.
- Use the equivalent command for other Linux distributions

Set up your UNIX account.

Set your default WSL to 2.
```js
wsl --set-default-version 2
```

Open Docker Desktop, go to Settings, and enable WSL2 based engine.

In Ubuntu, install Maven and Docker.
```js
sudo apt install maven
```
```
sudo apt install docker
```
Create a build.sh file and run.sh file <b>in your repository </b> using nano.
```js
nano build.sh
```

```js
#build.sh file:

IMAGE="<your project name here>"
docker build --tag=${IMAGE} .
```

```js
nano run.sh
```

```js
#run.sh file:
#!/bin/bash

NAME="<your project name here>"
IMAGE="<your project name here>:latest"

# Run
docker stop ${NAME} > /dev/null 2>&1
docker rm ${NAME} > /dev/null 2>&1
docker run -p 9999:9999/tcp --name ${NAME} ${IMAGE}
```

Finally create a Dockerfile. 
* This file should not have a file extension. Just name it Dockerfile
```js                                                   FROM adoptopenjdk/openjdk14:ubi
MAINTAINER <Your name, company or email address>
RUN mkdir /opt/<your project directory name to be>
COPY target/<project jar> /opt/<above named project directory>/
CMD ["java", "-jar", "/opt/<above named directory>/<jar>"]
EXPOSE <port to be utilized>
```

Log in to Docker, and  enjoy!
```js
docker login
```

### **Commands**
* Update later

<hr>

## **AWS**
### Setup
Make an AWS account.

Go to Elastic Container Registry (ECR).

Create a repository with the project name.

Click view push commands and run the commands.
```js
aws ecr get-login-password --region <your region> | docker login --username AWS --password-stdin <auth token provided>
```
```js
docker build -t <your repository name> .
```

```js
docker tag <your repository name>:latest <provided auth token tag>/<your repo name>:latest
```

Push your repository to AWS.
```js
docker push <given auth token tag>/<your repo name>:latest
```
On the left hand side navigation menu, under Amazon ECS click Clusters.

Create a cluster.

Select AWS Fargate.

Name the cluster, and create.

Where you found Clusters, now click Task Definitions.

Create a new task definition using Fargate.

Name it, give it the listed role and execution role.

Give it only the memory and task CPU you think it will need (or smallest available).

Create a new container.
* Give the container a name
* Give it "< provided auth token tag >/< your repo name >:latest" as an image
* Add

Press create.

Now, on the left hand menu under ECS, click Clusters.

Click on your project cluster.

Click Tasks.

Click Run New Task.

Switch to launch type and choose Fargate.

Leave most fields as they are, but give it the option listed for its VPC, and all available subnets.

For security groups, press edit and add a new TCP connection with the port you exposed in the Docker section.

Run Task.

