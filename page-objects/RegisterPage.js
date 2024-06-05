export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.newUserEmailInput = page.getByPlaceholder("E-Mail");
    this.newUserPasswordInput = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signUpAsNewUser = async (emailId, passwordId) => {
    await this.newUserEmailInput.waitFor();
    await this.newUserEmailInput.fill(emailId);
    await this.newUserPasswordInput.waitFor();
    await this.newUserPasswordInput.fill(passwordId);
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.pause();
  };
}