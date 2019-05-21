[ $1 ] && comment=$1 || comment="Execute deploy command"

echo "@@@@@@ GIT PULL"
git pull
echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION"
cp server/listens/express/client/talkn.client.js extention/talkn.client.js
cp server/listens/express/ext/ext.js extention/ext.js
echo "@@@@@@ COMPRESSIONS(SEREVR&EXTENSION)"
gzip server/listens/express/client/talkn.client.js
zip -r chromeExtension extention/*
echo "@@@@@@ GIT PUSH"
git add ./*
git commit -m "$comment"
git push
