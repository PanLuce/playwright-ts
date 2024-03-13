import { Page, ElementHandle } from 'playwright';

class CzechitasLoginPage {
  private page: Page;

  private readonly loginPageLocators = {
    loginButton: {
      type: 'submit',
      name: '_submit',
      class: 'btn btn-primary button',
      value: 'Přihlásit se',
    },
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto('/');
  }

  async getElementById(elementId: string): Promise<ElementHandle | null> {
    return await this.page.$(`#${elementId}`);
  }

  async fillInEmail(email: string) {
    const emailTextbox = this.page.getByLabel('E-mail');
    await emailTextbox?.fill(email);
  }

  async fillInPassword(password: string) {
    const passwordTextbox = this.page.getByLabel('Heslo');
    await passwordTextbox?.fill(password);
  }

  async clickLoginButton() {
    this.page.getByRole('button', { name: this.loginPageLocators.loginButton.value }).click();
  }

  async login(email: string, password: string) {
    await this.fillInEmail(email);
    await this.fillInPassword(password);
    await this.clickLoginButton();
  }

  async close() {
    await this.page.close();
  }
}

export default CzechitasLoginPage;