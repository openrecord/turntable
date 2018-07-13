#!/usr/bin/env bash

PROJECT_ROOT=$(git rev-parse --show-toplevel)
cd ${PROJECT_ROOT}

# Global Script Variables
ENV="staging"

function main() {
    parseArguments "$@"
    deploy
}

function parseArguments() {
    if [[ -x $1 ]]; then
        exitWithHelp
    fi

    case "$1" in
        staging) ENV="staging" ;;
        prod) ENV="prod" ;;
        *) exitWithHelp ;;
    esac
}

function deploy() {
    echo "Deploying $ENV..."
    docker-compose -f docker/api/deploy.docker-compose.yml build api
    docker-compose -f docker/api/deploy.docker-compose.yml run api npm run deploy:"$ENV"
}

function exitWithHelp() {
    echo "Must specify 'staging' or 'prod'";
    exit 1;
}

main "$@"

