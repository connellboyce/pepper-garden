#!/bin/bash

NAME="pepper-garden"
IMAGE="pepper-garden:latest"

# Run
docker stop ${NAME} > /dev/null 2>&1
docker rm ${NAME} > /dev/null 2>&1
docker run -p 9999:9999/tcp --name ${NAME} ${IMAGE}
