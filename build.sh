#!/usr/bin/env sh

set -eu

npm install

if [ -d build ]; then
  mv build build_old
fi

npm run build

if [ -d build_old ]; then
  rsync -a --ignore-existing build_old/ build/
  rm -rf build_old
fi
