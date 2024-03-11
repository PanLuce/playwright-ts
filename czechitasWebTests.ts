import { chromium } from 'playwright';
import CzechitasLoginPage from './pageObjects/czechitasLoginPage';

(async () => {
  // Launch a browser
  const browser = await chromium.launch();

  // Create a new page
  const page = await browser.newPage();

  const czechitasLoginPage = new CzechitasLoginPage(page);

  await czechitasLoginPage.navigateTo();
  await czechitasLoginPage.login('lukas-vitala@volny.cz', 'SU77ar02');

  // Close the browser
  await browser.close();
})();