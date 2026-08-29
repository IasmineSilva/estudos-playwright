const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://react-redux.realworld.io/#/login')

    await page.fill('input[type = "email"]', 'alanvoigt@yahoo.com.br')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test123')
    await page.click("form >> 'Sign in'")

    const html = await page.innerHTML('.feed-toggle')
    expect(html).toMatch('Your Feed')

    // Screeshot
    await page.screenshot({path: 'SignIn.png', fullPage: true})

    await browser.close()
})()