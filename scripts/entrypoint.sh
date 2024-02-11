#!/bin/sh

node node_modules/typeorm/cli migration:run -d ./dist/typeorm.js
node dist/main.js