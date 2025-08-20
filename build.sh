#!/bin/sh
set -e

if [ -z "$CONTENT_ROOT" ]; then
  echo "Error: CONTENT_ROOT must be defined."
  exit 1
fi

npm install
export BUILD_OUT_ROOT=out
npm run rari build
npm run build
npm run ssr
