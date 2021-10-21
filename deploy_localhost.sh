[ $1 ] && comment=$1 || comment="Execute deploy command"
echo "@@@@@@ GIT PULL"
#git rm -r --cached .
git pull
echo "@@@@@@ YARN RUN BUILD(API)"
cd api
yarn run build
cd ../
echo "@@@@@@ YARN RUN BUILD(CLIENT)"
cd client
yarn run build
cd ../
echo "@@@@@@ YARN RUN BUILD(COVER)"
cd cover
yarn run build
cd ../
echo "@@@@@@ RESOLVE EXTENSION　talkn.ext.js"
sed -i -e "1s/DEV/PROD/" server/src/listens/express/extension/talkn.ext.js
sed -i -e "1s/START/PROD/" server/src/listens/express/extension/talkn.ext.js
rm -f server/src/listens/express/extension/talkn.ext.js-e
echo "@@@@@@ COMPRESSIONS EXTENSION"
cp server/src/listens/express/api/talkn.api.js extension/talkn.api.js
cp server/src/listens/express/client/talkn.client.js extension/talkn.client.js
cp server/src/listens/express/api/ws.api.worker.js extension/ws.api.worker.js
cp server/src/listens/express/extension/talkn.ext.js extension/talkn.ext.js
zip -r chromeExtension extension/*
echo "@@@@@@ SETTING LOCALHOST"
sed -i -e "1s/PROD/START/" extension/talkn.ext.js
sed -i -e "1s/PROD/START/" server/src/listens/express/extension/talkn.ext.js
rm -f extension/talkn.ext.js-e
rm -f server/src/listens/express/extension/talkn.ext.js-e