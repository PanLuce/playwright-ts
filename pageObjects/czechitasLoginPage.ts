import { Page, ElementHandle } from 'playwright';

class CzechitasLoginPage {
  private page: Page;

  private readonly EMAIL_ID = 'frm-slotLoader-singIn-signIn-form-login';
  private readonly PASSWORD_ID = 'frm-slotLoader-singIn-signIn-form-password';
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
    await this.page.goto('https://komunita.czechitas.cz');
  }

  async getElementById(elementId: string): Promise<ElementHandle | null> {
    return await this.page.$(`#${elementId}`);
  }

  async fillInEmail(email: string) {
    const emailTextbox = await this.getElementById(this.EMAIL_ID);
    emailTextbox?.fill(email);
  }

  async fillInPassword(password: string) {
    const passwordTextbox = await this.getElementById(this.PASSWORD_ID);
    passwordTextbox?.fill(password);
  }

  async clickLoginButton() {
    this.page.getByRole('button', { name: this.loginPageLocators.loginButton.name }).click();
  }

  async login(email: string, password: string) {
    this.fillInEmail(email);
    this.fillInPassword(password);
    await this.clickLoginButton();
  }

  async close() {
    await this.page.close();
  }
}

export default CzechitasLoginPage;