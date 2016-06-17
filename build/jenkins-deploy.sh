#!/bin/bash
#
# Jenkins script to deploy this build
set -e

if test "$#" -lt 3; then
    echo "Usage: $0 <SUBNET_PREFIX> <DOCKER_PASSWORD> <DOCKER_TAG> <REGION>"
    exit 1
fi

TAG_NAME="DeployGroup"
TAG_VALUE="storymap-ui"
REGISTRY="openwhere"
SUBNET_PREFIX=$1
PASSWORD=$2
DOCKER_TAG=$3
REGION=${4:-us-east-1}

host_string=$(aws ec2 describe-instances --region $REGION --output text --filter Name=instance-state-name,Values=running Name=tag-key,Values=${TAG_NAME} Name=tag-value,Values=${TAG_VALUE} | grep PRIVATEIPADDRESS| grep ${SUBNET_PREFIX} | awk '{printf "%s ", $3;}'  )
hosts=($host_string)

echo "Found following hosts to update: ${host_string}"

for var in "${hosts[@]}"
do
    echo "Deploying to ${var}..."
    ssh -tt ec2-user@${var} "docker stop ${TAG_VALUE} || true; docker rm ${TAG_VALUE} || true; docker images -q --filter \"dangling=true\" | xargs docker rmi; docker login -u openwhere -p ${PASSWORD} -e devops@openwhere.com; docker pull ${REGISTRY}/${TAG_VALUE}:${DOCKER_TAG} && /var/lib/cloud/scripts/docker-run.sh"
done
