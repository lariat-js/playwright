#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Releasing is only allowed from CI."
  exit 1
fi

yarn ts -p tsconfig.build.json
yarn changeset publish
