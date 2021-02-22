#!/bin/bash

RED='\033[0;31m'
NC='\033[0m' # No

logMsg() {
    local datePattern="date +%d.%b.%Y-%H.%M.%S"
    #echo -e "\e[31m$*\e[0m" 1>&2
    echo -e "${RED}$($datePattern): $*${NC}" 1>&2
}

command npm -v >/dev/null 2>&1
if [[ $? != 0 ]]; then
    echo 'Error: both node and npm commands must be on path'
    exit 1
fi

set -e

#PROJECT_ROOT=$(git rev-parse --show-toplevel)
WORKING_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
SERVER_DIR="$WORKING_DIR/server"
CLIENT_DIR="$WORKING_DIR/client"

# install package
for i in $SERVER_DIR $CLIENT_DIR; do
    logMsg "Running npm install on $i ..."
    cd $i
    npm install
done

# build client
cd $CLIENT_DIR
logMsg "Building client from $CLIENT_DIR"
npm run build

logMsg "Starting server from $CLIENT_DIR"
cd $SERVER_DIR
npm run start:dev
