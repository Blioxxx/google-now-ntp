#!/bin/bash
rm -f package.zip
zip package.zip * -r -x .git
echo "Packaged extension into package.zip"
