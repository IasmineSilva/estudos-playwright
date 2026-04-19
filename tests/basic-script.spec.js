const { test, expect } = require('@playwright/test');

test('basic script: abre TodoMVC e tira screenshot', async ({ page }, testInfo) => {
    await page.goto('https://todomvc.com/examples/react/#/');

    await expect(page.locator('.todoapp')).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('todomvc.png'), fullPage: true });
});
