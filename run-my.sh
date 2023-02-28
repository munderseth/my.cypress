#!/bin/sh

#######################################################################
#
# npx cypress run
# testspace cypress/results/*.xml{cypress/e2e} @./list.txt "#NAME"
#
#######################################################################
rm cypress/results/*
# --spec /to/file
npx cypress run --spec cypress/e2e/3-my-tests --headed $1 $2

