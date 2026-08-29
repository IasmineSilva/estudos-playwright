const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch()

    const userContext = await browser.newContext()
    const adminContext = await browser.newContext()

    await browser.close()
})()