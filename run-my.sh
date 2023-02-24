#!/bin/sh

# --spec /to/file
rm cypress/results/*
npx cypress run --spec cypress/e2e/3-my-tests --headed $1 $2