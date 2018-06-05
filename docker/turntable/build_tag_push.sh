#!/usr/bin/env bash

IMAGE=openrecord/turntable

echo "Building latest image: [Image: $IMAGE]"
docker build . --file docker/turntable/Dockerfile

echo "Tagging image as latest: [Image: $IMAGE, Tag: $IMAGE:latest]"
docker tag ${IMAGE} ${IMAGE}:latest

echo "Pushing to dockerhub"
docker push ${IMAGE}:latest && echo "Pushed: ${IMAGE}:latest"
