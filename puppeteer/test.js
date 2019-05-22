const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://localhost');
    await page.waitForSelector('[data-component-name=Container]');

    for(let i = 0; i < 10; i++){
        await page.type('textarea', "HEY! " + i);
        await page.click('button');
    }
    await page.screenshot({ path: 'test/screenshot/talkn.png' });
    browser.close();
})();