#!/usr/bin/env sh

IMAGE=openrecord/turntable

PROJECT_ROOT=$(git rev-parse --show-toplevel)
cd ${PROJECT_ROOT}

echo "Building Docker image: [Image: $IMAGE]"
docker build . --file docker/api/Dockerfile -t ${IMAGE}

echo "Tagging image as latest: [Image: $IMAGE, Tag: $IMAGE:latest]"
docker tag ${IMAGE} ${IMAGE}:latest

echo "Pushing to dockerhub"
docker push ${IMAGE}:latest && echo "Pushed: ${IMAGE}:latest"
