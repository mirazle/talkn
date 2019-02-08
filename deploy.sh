[ $1 ] && comment=$1 || comment="exeDeployCommand"

git pull
yarn run build
cp server/listens/express/talkn.client.js extention/talkn.client.js
zip chromeExtension extention/*
git add ./*
git commit -m comment
git push
