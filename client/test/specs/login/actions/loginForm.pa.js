const LoginPage = require('../page/loginForm.po');
const page = new LoginPage();

class LoginActions {
  async enterEmail(value) {
    const emailInput = await $(page.emailInput);
    await emailInput.waitForDisplayed(10000);
    await emailInput.clearValue();
    await emailInput.setValue(value);
  }

  async enterPassword(value) {
    const passInput = await $(page.passInput);
    await passInput.waitForDisplayed(10000);
    await passInput.clearValue();
    await passInput.setValue(value);
  }

  async clickLogin() {
    const loginButton = await $(page.loginButton);
    await loginButton.waitForDisplayed(10000);
    await loginButton.click();
  }

  async submitLoginForm(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async waitForLogo() {
    const logo = await $(page.logo);
    await logo.waitForDisplayed(10000);
  }

  async getNotificationText() {
    const errorNotification = await $(page.errorNotification);
    await errorNotification.waitForDisplayed(10000);
    return await errorNotification.getText();
  }
}

module.exports = new LoginActions();
