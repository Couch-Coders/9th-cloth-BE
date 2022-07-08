#!/usr/bin/env bash

ENV_FILE="../.env"

if [ ! -e $ENV_FILE ]; then
  exit 1
fi

heroku config:set --app cloth-service $(cat ${ENV_FILE} | sed "/^$/d" | tr "\n" " ")