#!/bin/bash
cd /home/ubuntu/bsa-2019-fantasy/server/
yarn
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
pm2 start --interpreter=./node_modules/.bin/babel-node server.js --name Fantasy
cd /home/ubuntu/bsa-2019-fantasy/client/
yarn
xvfb-run --server-args=\"-screen 0 1920x1080x24\" ./node_modules/.bin/wdio wdio.conf.js
