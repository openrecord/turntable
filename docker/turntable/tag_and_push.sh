#!/usr/bin/env bash

IMAGE=openrecord/turntable

echo "Tagging image as latest: [Image: $IMAGE, Tag: $IMAGE:latest]"
docker tag ${IMAGE} ${IMAGE}:latest

echo "Pushing to dockerhub"
docker push ${IMAGE}:latest && echo "Pushed: ${IMAGE}:latest"
