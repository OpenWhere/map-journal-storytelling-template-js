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

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR=$DIR/$APP_NAME
BUILD_DIR=$DIR/target/$APP_NAME
DIST_FILE_NAME=$APP_NAME-$APP_VERSION.zip
DIST_FILE_PATH=$BUILD_DIR/$DIST_FILE_NAME

if [ ! -d "$APP_DIR" ]; then
  echo "Invalid APP_NAME name, directory doesn't exist: $APP_DIR"
  exit 1
fi

rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

cp -r $APP_DIR/.ebextensions $APP_DIR/* $BUILD_DIR

sed "s/<REGION>/$REGION/" < $BUILD_DIR/Dockerrun.aws.json.template > $BUILD_DIR/Dockerrun.aws.json
sed -i "s/<TAG>/$APP_VERSION/" $BUILD_DIR/Dockerrun.aws.json

pushd $BUILD_DIR
zip -r $DIST_FILE_NAME .ebextensions *
popd

RELEASE_S3_BUCKET=net-openwhere-releases-$REGION
RELEASE_S3_KEY=beanstalk/$APP_NAME/$DIST_FILE_NAME
DESCRIPTION="$APP_NAME $APP_VERSION, built $( date -u )"

echo "Uploading beanstalk application config to S3..."

aws s3 cp --region $REGION $DIST_FILE_PATH s3://$RELEASE_S3_BUCKET/$RELEASE_S3_KEY

echo "Creating beanstalk application version..."

aws elasticbeanstalk create-application-version \
  --region $REGION \
  --application-name $APP_NAME \
  --version-label "$APP_VERSION" \
  --description "$DESCRIPTION" \
  --source-bundle S3Bucket="$RELEASE_S3_BUCKET",S3Key="$RELEASE_S3_KEY"

echo $DESCRIPTION
echo "done."
echo
