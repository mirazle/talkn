const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://talkn.io');
  await page.screenshot({ path: 'talkn.png' });

  browser.close();
})();