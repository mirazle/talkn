[ $1 ] && comment=$1 || comment="Execute deploy command[LOCALHOST]"
echo "@@@@@@ YARN RUN BUILD"
yarn run build
cp server/listens/express/client/talkn.client.js extension/talkn.client.js
cp server/listens/express/ext/ext.js extension/ext.js