import { test, chromium, Browser, Page, expect } from '@playwright/test';
import CzechitasLoginPage from '../pageObjects/czechitasLoginPage';

test.describe('Czechitas courses tests', () => {
    let browser: Browser;
    let page: Page;
    let czechitasLoginPage: CzechitasLoginPage;

    test.beforeAll(async () => {
        // Launch a browser
        browser = await chromium.launch();

        // Create a new page
        page = await browser.newPage();
    });

    test.beforeEach(async ({ page }) => {
        czechitasLoginPage = new CzechitasLoginPage(page);
        await czechitasLoginPage.navigateTo();
        await czechitasLoginPage.login('lukas-vitala@volny.cz', 'SU77ar02');
        await page.goto('https://komunita.czechitas.cz/cs/kurzy');
    });

    test.afterEach(async () => {
        // Close the browser
        await browser.close();
    });

    test('Single course is displayed', async ({page}) => {
        const tableItems = await page.locator('.table-tbody').locator('.flex-column');
        // then        
        await expect(tableItems.count()).toBeGreaterThan(0);
    })

    test('More courses are displayed', async ({page}) => {
        const tableItems = await page.locator('.table-tbody').locator('.flex-column');
        // then        
        await expect(tableItems.count()).toBeGreaterThan(2);
    })
})