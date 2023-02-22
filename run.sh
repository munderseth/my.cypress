#!/bin/sh

# --spec /to/file
rm cypress/results/*
npx cypress run --headed $1 $2