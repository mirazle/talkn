[ $1 ] && comment=$1 || comment="Execute deploy command[LOCALHOST]"
echo "@@@@@@ YARN RUN BUILD"
yarn run build
cp server/listens/express/client/talkn.client.js extension/talkn.client.js
cp server/listens/express/ext/ext.js extension/ext.js
echo "@@@@@@ RESOLVE EXTENSION　ext.js"
sed -i -e "1s/DEV/PROD/" server/listens/express/ext/ext.js
sed -i -e "1s/START/PROD/" server/listens/express/ext/ext.js
rm -f server/listens/express/ext/ext.js-e
echo "@@@@@@ COMPRESSIONS EXTENSION"
cp server/listens/express/client/talkn.client.js extension/talkn.client.js
cp server/listens/express/ext/ext.js extension/ext.js
zip -r chromeExtension extension/*
echo "@@@@@@ SETTING LOCALHOST"
sed -i -e "1s/PROD/START/" extension/ext.js
sed -i -e "1s/PROD/START/" server/listens/express/ext/ext.js
rm -f extension/ext.js-e
rm -f server/listens/express/ext/ext.js-e