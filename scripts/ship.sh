#!/bin/bash

cd ../client
yarn build
cd ..
cf push type-to-survive "node server.js"
