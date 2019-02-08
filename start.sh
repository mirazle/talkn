forever stopall
ps -x | grep node | awk '{print $1}' > p.txt

cat p.txt | while read pid
do
    kill -9 $pid
done
rm p.txt
yarn run prod
ps -aux | grep node
