#!/usr/bin/env bash
set -euo pipefail

packageName=
description=

read -p "Package name: " packageName
read -p "Description: " description

# Set working directory to the script's location so we can safely use relative paths in this script.
cd "${0%/*}";

sed -i "" "s/npm-package-template/${packageName}/g" README.md
sed -i "" "s/npm-package-template/${packageName}/g" CHANGELOG.md
sed -i "" "s/npm-package-template/${packageName}/g" package.json
sed -i "" "s/npm-package-template/${packageName}/g" yarn.lock
sed -i "" "s/npm-package-template/${packageName}/g" .github/workflows/format.yml

sed -i "" "s/{{description}}/${description}/g" README.md
sed -i "" "s/{{description}}/${description}/g" package.json

rm init.sh
