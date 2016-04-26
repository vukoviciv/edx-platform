#!/usr/bin/env bash
set -e

# Note: It is assumed that this runs after accessibility_tests.sh
# so we do not run jenkins-common.sh again. If we decide to run
# this on PR builds, we can just move the following to accessibility-tests.sh

echo "Running pa11ycrawler against test course..."
paver pa11ycrawler --fasttest

echo "Generating coverage report..."
paver pa11ycrawler_coverage
