echo "@@@@@@ STOP PROCCESS"
forever stopall
ps -x | grep node | awk '{print $1}' > p.txt

cat p.txt | while read pid
do
    kill -9 $pid
done
rm p.txt
echo "@@@@@@ YARN INSTALL"
yarn install
echo "@@@@@@ YARN RUN PROD"
yarn run prod
echo "@@@@@@ PROCCESS LIST"
ps -aux | grep node
