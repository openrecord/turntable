#!/usr/bin/env sh

IMAGE=openrecord/turntable

PROJECT_ROOT=$(git rev-parse --show-toplevel)
cd ${PROJECT_ROOT}

./build.sh

echo "Pushing to dockerhub"
docker push ${IMAGE}:latest && echo "Pushed: ${IMAGE}:latest"
