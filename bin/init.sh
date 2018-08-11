#!/usr/bin/env bash

set -e

echo "Starting mysql image."
docker-compose up -d mysql

echo "Initializing database."
node bin/database/setupDatabase.js

echo "Synchronizing database."
node bin/database/synchronizeDatabase.js