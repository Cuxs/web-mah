#!/usr/bin/env sh

set -eu

npm install
npm run build

mkdir -p prod
rsync -a build/ prod/
