const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';
const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Fluxo no SauceDemo - boas praticas', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await expect(page).toHaveURL(/saucedemo\.com/);
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('deve autenticar com sucesso e exibir produtos', async ({ page }) => {
        await test.step('Preenche credenciais validas e envia', async () => {
            await page.getByPlaceholder('Username').fill(VALID_USER);
            await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('Valida redirecionamento parnventario', async () => {
            await expect(page).toHaveURL(/\/inventory\.html$/);
            await expect(page.getByText('Products')).toBeVisible();
            await expect(page.locator('.inventory_item')).toHaveCount(6);
        });
    });

    test('deve exibir erro com senha invalida', async ({ page }) => {
        await page.getByPlaceholder('Username').fill(VALID_USER);
        await page.getByPlaceholder('Password').fill('senha-invalida');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/saucedemo\.com/);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });

    test('deve adicionar item ao carrinho apos login', async ({ page }) => {
        await test.step('Realiza login', async () => {
            await page.getByPlaceholder('Username').fill(VALID_USER);
            await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page).toHaveURL(/\/inventory\.html$/);
        });

        await test.step('Adiciona produto no carrinho e valida badge', async () => {
            await page.getByRole('button', { name: 'Add to cart' }).first().click();
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        });
    });
});