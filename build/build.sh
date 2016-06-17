#!/bin/bash
#
# Jenkins script to build a docker image for this project and upload to the docker registry
#

set -e

if [ -z "$1" ]; then
    TAG="latest"
else
    TAG=$1
fi

REGISTRY=${DOCKER_REGISTRY:-openwhere}

grunt clean:deploy
npm prune --production

docker build -t storymap-ui .
docker tag -f storymap-ui $REGISTRY/storymap-ui:${TAG}
docker push $REGISTRY/storymap-ui:${TAG}
