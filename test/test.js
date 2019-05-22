const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://localhost');
  await page.waitForSelector('[data-component-name=Container]');
  await page.screenshot({ path: 'test/talkn.png' });

  browser.close();
})();