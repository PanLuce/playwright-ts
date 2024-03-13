import { test, chromium, Browser, Page, expect } from '@playwright/test';
import CzechitasLoginPage from '../pageObjects/czechitasLoginPage';

test.describe('Czechitas login page tests', () => {
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
    });

    test.afterEach(async () => {
        // Close the browser
        await browser.close();
    });

    test('Login', async ({page}) => {
        // when
        await czechitasLoginPage.login('lukas-vitala@volny.cz', 'SU77ar02');
        // then
        await expect(page.locator('#kt_app_sidebar div').filter({ hasText: 'LV Vitala Lukáš' }).first()).toBeVisible();
    })
})