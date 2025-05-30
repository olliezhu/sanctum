#!/bin/bash
rm extension.zip && zip -r extension.zip . -x ".git/*" ".gitignore" "extension.zip" "images/*"
