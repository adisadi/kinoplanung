#!/bin/bash

cd client
ng build --prod -pr false  2> /dev/null
cd ..

cd server
npm run build 2> /dev/null
cd ..

rm -rf ./deploy  2> /dev/null
mkdir deploy

cp -r ./server/dist/* ./deploy
cp -r ./client/dist ./deploy

cp ./server/web.config ./deploy
cp ./server/config.json ./deploy

rm -rf ./deploy/node_modules

rm ./deploy.zip  2> /dev/null

cd deploy
zip -rq ../deploy.zip .

cd ..
rm -rf ./deploy