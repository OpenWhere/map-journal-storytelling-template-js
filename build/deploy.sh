#!/bin/bash

if test "$#" -ne 4; then
  echo "Usage: $0 <application name> <version label> <beanstalk env> <region>"
  echo
  echo "e.g.  $0 storymap-ui 1.3.1_600 storymap-ui-dev us-east-1"
  exit 1
fi

APP_NAME=$1
APP_VERSION=$2
BEANSTALK_ENV=$3
REGION=$4

echo "Triggering update of beanstalk environment $BEANSTALK_ENV to $APP_VERSION..."
while true; do
    STATUS="$(aws elasticbeanstalk describe-environments --region $REGION --application-name $APP_NAME --environment-names $BEANSTALK_ENV --output json | python -c 'import sys,json; print json.load(sys.stdin)["Environments"][0]["Status"]')"

    if [ "$STATUS" == "Ready" ]; then
        echo "Environment ready, updating $BEANSTALK_ENV to $APP_VERSION"
        break
    elif [[ $STATUS == Terminat* ]] ; then
        echo "Environment terminated. exiting"
        exit 1
    else
        echo "Waiting for environment to be ready to upate. Current status '$STATUS' as of $( date -u )"
        sleep 10
    fi
done

aws elasticbeanstalk update-environment \
  --region $REGION \
  --environment-name "$BEANSTALK_ENV" \
  --version-label "$APP_VERSION"


echo $DESCRIPTION
echo "done."
echo
