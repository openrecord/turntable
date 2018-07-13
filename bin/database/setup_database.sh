#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

HOST=0.0.0.0
PASSWORD=${ROOT_PASSWORD-"password"}
SQL_FILE='setup_database.dev.sql'

function main() {
    parseArguments "$@"
    setupDb
}

function parseArguments() {
    if [[ -z $1 ]]; then
        ENV="dev"
    else
        case "$1" in
            dev) ENV="dev" ;;
            staging) ENV="staging" ;;
            prod) ENV="prod" ;;
            *) exitWithHelp ;;
        esac
    fi
}

function setupDb() {
    echo "Initializing database for $ENV..."
    SQL_FILE="setup_database.$ENV.sql"
    mysql --user=root --password=$PASSWORD -h $HOST < $DIR/$SQL_FILE
}

function exitWithHelp() {
    echo "Must specify 'dev' or 'prod' and ROOT_PASSWORD must be defined.";
    exit 1;
}

main "$@"