const { Cluster } = require("puppeteer-cluster");
const process = require("process");
const wsConnectionCnt = process.argv[2] ? process.argv[2] : 1;
const wsPostCnt = process.argv[3] ? process.argv[3] : 1;
const timeout = 0;
const timeoutOption = { timeout: timeout, setDefaultNavigationTimeout: timeout, setDefaultTimeout: timeout };

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10000,
  });

  for (let i = 0; i < wsConnectionCnt; i++) {
    cluster.queue("https://talkn.io/", async ({ page, data: url }) => {
      await page.goto(url);
      await page.waitForSelector("[data-component-name=Container]", timeoutOption);
      console.log(i + " : " + url);
    });
  }

  await cluster.idle();
  await cluster.close();
})();

/*
if (cluster.isMaster) {
  for (let i = 0; i < wsConnectionCnt; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} dead`);
  });
} else {
  const puppeteer = require("puppeteer");
  const ua = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36`;
  const timeout = 0;
  const timeoutOption = { timeout: timeout, setDefaultNavigationTimeout: timeout, setDefaultTimeout: timeout };
  const launchOption = { timeout, args: ["--no-sandbox", "--headless", "--disable-gpu", "--window-size=1920x1080"] };

  (async () => {
    console.log("----------- " + process.pid);
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();
    await page.setDefaultTimeout(timeout);
    await page.setDefaultNavigationTimeout(timeout);
    await page.setUserAgent(`${ua} ${process.pid}`);
    await page.goto(`https://talkn.io/`, timeoutOption);
    await page.waitForSelector("[data-component-name=Container]", timeoutOption);
    await page.waitForSelector('textarea[data-component-name= "postArea"]', timeoutOption);
    // await postOneUser(page, wsPostCnt);
    await process.exit(0);
  })();
}

const postOneUser = async (page, wsPostCnt) => {
  for (let j = 0; j < wsPostCnt; j++) {
    const post = `USER_${process.pid} ${new Date()}`;
    await page.type('textarea[data-component-name="postArea"]', post);
    await page.click("button");
  }
};
*/
