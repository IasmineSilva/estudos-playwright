const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 50 })
    const context = await browser.newContext({ acceptDownloads: true })
    const page = await context.newPage()

    await page.goto('https://github.com/gothinkster/react-redux-realworld-example-app')
    
    await page.click("summary[class='Button--primary Button--medium Button flex-1 d-inline-flex']")
    
    const [ download ] = await Promise.all([
        page.waitForEvent('download'), 
        page.click('.octicon-file-zip')
    ])

    const path = await download.path()
    console.log(path)

    download.saveAs('./download.zip')
    
    await browser.close()
})()