const { test, expect } = require('@playwright/test');

test('deve pesquisar no Google clicando em Pesquisar', async ({ page }) => {
    await page.goto('https://www.google.com/ncr?hl=pt-BR');

    const aceitarTudo = page.getByRole('button', { name: /Aceitar tudo|Accept all/i });
    if (await aceitarTudo.isVisible().catch(() => false)) {
        await aceitarTudo.click();
    }

    await expect(page).toHaveTitle(/Google/i);
    const campoBusca = page.locator('textarea[name="q"]');
    await expect(campoBusca).toBeVisible();

    await campoBusca.fill('playwright');

    const botaoPesquisar = page.getByRole('button', { name: /Pesquisa Google|Google Search/i }).first();
    await botaoPesquisar.click();

    await expect(page).toHaveURL(/\/search\?q=playwright/i);
});
