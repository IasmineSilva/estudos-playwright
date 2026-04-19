const { test, expect } = require('@playwright/test');

test('identify elements: localiza botao e campos de login', async ({ page }) => {
    await page.goto('https://react-redux.realworld.io/#/login');

    const signIn = page.getByRole('button', { name: /sign in/i });
    await expect(signIn).toBeVisible();

    const inputs = page.locator('.form-control');
    await expect(inputs).toHaveCount(2);

    await inputs.nth(0).fill('teste@example.com');
    await inputs.nth(1).fill('12345678');
});
