[ $1 ] && comment=$1 || comment="Execute deploy command"
echo "@@@@@@ GIT PULL"
#git rm -r --cached .
git pull
echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION　talkn.ext.js"
sed -i -e "1s/DEV/PROD/" server/listens/express/extension/talkn.ext.js
sed -i -e "1s/START/PROD/" server/listens/express/extension/talkn.ext.js
rm -f server/listens/express/extension/talkn.ext.js-e
echo "@@@@@@ COMPRESSIONS EXTENSION"
cp server/listens/express/client/talkn.client.js extension/talkn.client.js
cp server/listens/express/api/talkn.api.js extension/talkn.api.js
cp server/listens/express/api/ws.api.worker.js extension/ws.api.worker.js
cp server/listens/express/extension/talkn.ext.js extension/talkn.ext.js
zip -r chromeExtension extension/*
echo "@@@@@@ GIT PUSH"
git add ./*
git commit -m "$comment"
git push
echo "@@@@@@ SETTING LOCALHOST"
sed -i -e "1s/PROD/START/" extension/talkn.ext.js
sed -i -e "1s/PROD/START/" server/listens/express/extension/talkn.ext.js
rm -f extension/talkn.ext.js-e
rm -f server/listens/express/extension/talkn.ext.js-e