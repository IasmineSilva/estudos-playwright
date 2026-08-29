const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://react-redux.realworld.io/#/login')
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('a[target="_blank"]') // Opens a new tab
    ])

    console.log(await page.title())
    console.log(await newPage.title())

    await browser.close()
})()