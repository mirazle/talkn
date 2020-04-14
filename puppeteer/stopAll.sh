ps -x | grep puppeteer | awk '{print $1}' > puppeteer.txt
cat puppeteer.txt | while read pid
do
    kill -9 $pid
done
rm puppeteer.txt