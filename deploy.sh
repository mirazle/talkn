[ $1 ] && comment=$1 || comment="exeDeployCommand"

echo "@@@@@@ GIT PULL @@@@@@"
git pull
echo "@@@@@@ YARN RUN BUILD @@@@@@"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION @@@@@@"
cp server/listens/express/talkn.client.js extention/talkn.client.js
zip chromeExtension extention/*
echo "@@@@@@ GIT PUSH @@@@@@"
git add ./*
git commit -m comment
git push
