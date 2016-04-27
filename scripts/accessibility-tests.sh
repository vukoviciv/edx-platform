#!/usr/bin/env bash
set -e

echo "Setting up for accessibility tests..."
source scripts/jenkins-common.sh

echo "Running explicit accessibility tests..."
SELENIUM_BROWSER=phantomjs paver test_a11y

echo "Generating coverage report..."
paver a11y_coverage

echo "Running pa11ycrawler against test course..."
paver pa11ycrawler --fasttest --fetch-course

echo "Generating coverage report..."
paver pa11ycrawler_coverage
