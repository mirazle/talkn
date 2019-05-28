[ $1 ] && comment=$1 || comment="Execute deploy command"

echo "@@@@@@ GIT PULL"
git pull
echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION　ext.js"
sed -i -e "1s/DEV/PROD/" server/listens/express/ext/ext.js
sed -i -e "1s/START/PROD/" server/listens/express/ext/ext.js
rm -f server/listens/express/ext/ext.js-e
echo "@@@@@@ COMPRESSIONS EXTENSION"
cp server/listens/express/client/talkn.client.js extention/talkn.client.js
cp server/listens/express/ext/ext.js extention/ext.js
zip -r chromeExtension extention/*
echo "@@@@@@ SETTING LOCALHOST"
sed -i -e "1s/PROD/START/" extention/ext.js
rm -f extention/ext.js-e
sed -i -e "1s/PROD/START/" server/listens/express/ext/ext.js
rm -f server/listens/express/ext/ext.js-e
echo "@@@@@@ GIT PUSH"
git add ./*
git commit -m "$comment"
git push
