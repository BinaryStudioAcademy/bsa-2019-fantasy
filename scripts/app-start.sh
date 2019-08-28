#!/bin/bash
cd /home/ubuntu/bsa-2019-fantasy/server/
npm i
npm i bcrypt --unsafe-perm
npm rebuild
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
pm2 start --interpreter=./node_modules/.bin/babel-node server.js --name Fantasy
