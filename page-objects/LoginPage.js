import { timeout } from '../playwright.config';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginInput = page.locator('[placeholder="E-Mail"]');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.submitButtons = page.locator('[type="submit"]');
  }

  goTo = async () => {
    await this.loginInput.waitFor();
    await this.loginInput.fill("admin");
    await this.passwordInput.fill("Admin123");
    await this.submitButtons.first().waitFor();
    await this.submitButtons.first().click();
    await this.page.waitForURL("/delivery-details", {timeout: 3000});
     
    await this.page.pause()
  }

  moveToSignUp = async () => {
    await this.submitButtons.nth(1).waitFor();
    await this.submitButtons.nth(1).click();
    await this.page.waitForURL(/\/signup/gm, {timeout: 3000});
  }
}