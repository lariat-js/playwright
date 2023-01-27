#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
	echo "Releasing is only allowed from CI."
	exit 1
fi

yarn build
yarn changeset publish
