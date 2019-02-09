echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE EXTENSION"
cp server/listens/express/talkn.client.js extention/talkn.client.js
zip chromeExtension extention/*
