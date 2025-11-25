#!/bin/bash
set -e

rm -f extension.zip

git ls-files -z --others --cached --exclude-standard | xargs -0 zip extension.zip
