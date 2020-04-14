node ./puppeteer/ws/loadOneUser.js 1 1 &
wait $!
if [ $? -eq 0 ]; then
    successCnt=`expr $1 + 1`
    echo $successCnt > ./puppeteer/ws/successCnt.txt
else
    faultCnt=`expr $2 + 1`
    echo $faultCnt > ./puppeteer/ws/faultCnt.txt
fi
