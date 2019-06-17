[ $1 ] && comment=$1 || comment="Execute deploy command"
echo "@@@@@@ GIT PULL"
git pull
echo "@@@@@@ YARN RUN BUILD"
yarn run build
echo "@@@@@@ RESOLVE　ext.js"
sed -i -e "1s/DEV/PROD/" server/listens/express/ext/ext.js
sed -i -e "1s/START/PROD/" server/listens/express/ext/ext.js
rm -f server/listens/express/ext/ext.js-e
echo "@@@@@@ COMPRESSIONS TO ZIP THAT EXTENSION "
cp server/listens/express/client/talkn.client.js extention/talkn.client.js
zip -r chromeExtension extention/*
echo "@@@@@@ GIT PUSH"
git add ./*
git commit -m "$comment"
git push
echo "@@@@@@ SETTING LOCALHOST"
sed -i -e "1s/PROD/START/" extention/script.js
sed -i -e "1s/PROD/START/" server/listens/express/ext/ext.js
rm -f extention/script.js-e
rm -f server/listens/express/ext/ext.js-e