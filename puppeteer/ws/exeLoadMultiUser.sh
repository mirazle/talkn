successCnt=0
faultCnt=0
rm ./puppeteer/ws/successCnt.txt
rm ./puppeteer/ws/faultCnt.txt
TEST=1
echo $successCnt > ./puppeteer/ws/successCnt.txt
echo $faultCnt > ./puppeteer/ws/faultCnt.txt
export clearCnt=$1
while [ "$successCnt" -lt "$clearCnt" ]
do
    successCnt=$(<./puppeteer/ws/successCnt.txt)
    faultCnt=$(<./puppeteer/ws/faultCnt.txt)
    echo "[ SUCCESS ]" $successCnt "/" $clearCnt
    echo "[ FAILURE ]" $faultCnt
    sh puppeteer/ws/exeLoadOneUser.sh $successCnt $faultCnt &
    sleep 0.5s
done 