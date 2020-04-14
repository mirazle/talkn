const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport( {width: 1200, height: 1024} );
    await page.setUserAgent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36`);

    // 電気
    await page.goto(`https://looop-denki.com/own`);
    await page.type('input#login-id', 'ganador.life01@gmail.com');
    await page.type('input#password', 'Ambre11a1887');
    await page.click('button');
    await page.goto(`https://looop-denki.com/own/mypage/invoice/`);
    await page.screenshot( {path: "./denki.png",  fullPage:true} );

    // 水道
    await page.goto(`https://suidonet.waterworks.metro.tokyo.jp/inet-service/members/login`);
    await page.type('input#userName', 'yy26vmfi');
    await page.type('input#password', 'Ambre11a1887');
    await page.click('input[type="image"]');
    await page.goto(`https://suidonet.waterworks.metro.tokyo.jp/inet-service/members/member_page/jisseki`);
    await page.screenshot( {path: "./suidou.png",  fullPage:true} );

    // ガス
    await page.goto(`https://members.tokyo-gas.co.jp/login_openid.jsp`);
    await page.waitForSelector('form');
    await page.waitForSelector('.login-block');
    await page.waitForSelector('input#loginId');
    await page.waitForSelector('input#password');
    await page.type('input#loginId', 'ganador.life01@gmail.com');
    await page.type('input#password', 'Ambre11a1887');
    await page.click('input#submit-btn');
    await page.waitFor(5000);
    await page.goto(`https://members.tokyo-gas.co.jp/services/mieru/total.html`);
    await page.screenshot( {path: "./gasu.png",  fullPage:true} );
    browser.close();
})();