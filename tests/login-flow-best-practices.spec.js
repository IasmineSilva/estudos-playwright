const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://the-internet.herokuapp.com';
const VALID_USER = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';

test.describe('Fluxo de login - boas praticas', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page).toHaveURL(/\/login$/);
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    });

    test('deve autenticar com sucesso e permitir logout', async ({ page }) => {
        await test.step('Preenche credenciais validas e envia', async () => {
            await page.locator('#username').fill(VALID_USER);
            await page.locator('#password').fill(VALID_PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Valida redirecionamento e mensagem de sucesso', async () => {
            await expect(page).toHaveURL(/\/secure$/);
            await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
            await expect(page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
        });

        await test.step('Realiza logout e retorna para tela de login', async () => {
            await page.getByRole('link', { name: 'Logout' }).click();
            await expect(page).toHaveURL(/\/login$/);
            await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
        });
    });

    test('deve exibir erro com senha invalida', async ({ page }) => {
        await page.locator('#username').fill(VALID_USER);
        await page.locator('#password').fill('senha-invalida');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/\/login$/);
        await expect(page.locator('#flash')).toContainText('Your password is invalid!');
    });

    test('deve exibir erro com usuario invalido', async ({ page }) => {
        await page.locator('#username').fill('usuario-invalido');
        await page.locator('#password').fill(VALID_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/\/login$/);
        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    });
});