[ $1 ] && comment=$1 || comment="Execute deploy command[LOCALHOST]"
echo "@@@@@@ YARN RUN BUILD"
cd client
yarn run build
cd ../
cp server/listens/express/client/talkn.client.js extention/talkn.client.js
cp server/listens/express/ext/ext.js extention/ext.js