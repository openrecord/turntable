#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mysql --user=root --password=password -h 0.0.0.0 < $DIR/setup_database.sql