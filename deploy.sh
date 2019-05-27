[ $1 ] && comment=$1 || comment="Execute deploy command"

echo "@@@@@@ GIT PULL"
git pull
echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION"
cp server/listens/express/client/talkn.client.js extention/talkn.client.js
cp server/listens/express/ext/ext.js extention/ext.js
sed -i -e "1s/DEV/PROD/" extention/ext.js
sed -i -e "1s/START/PROD/" extention/ext.js
rm -f extention/ext.js-e
echo "@@@@@@ COMPRESSIONS(EXTENSION)"
zip -r chromeExtension extention/*

sed -i -e "1s/PROD/START/" extention/ext.js
rm -f extention/ext.js-e
echo "@@@@@@ GIT PUSH"
git add ./*
git commit -m "$comment"
git push
