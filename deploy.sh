git pull
yarn run build
cp server/listens/express/talkn.client.js client/extention/talkn.client.js
git add ./*
git commit -m "deploy.sh"
git push
