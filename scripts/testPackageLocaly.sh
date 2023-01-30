#!/bin/sh

# Description: This script is used to test the package locally
const_testingProjectPath="/Users/peterknezek/projects/itigma"
const_packageName="name-day-calendar"
const_version="0.0.0"

# Build the package
npm run build

# Create peckage in the root directory
npm pack --pack-destination ~

# Install the package in the test project
cd $const_testingProjectPath
npm install -D ~/$const_packageName-$const_version.tgz
