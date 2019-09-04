const LoginPage = require('../page/loginForm.po');
const page = new LoginPage();

class LoginActions {
  async enterEmail(value) {
    await page.emailInput.waitForDisplayed(10000);
    await page.emailInput.clearValue();
    await page.emailInput.setValue(value);
  }

  async enterPassword(value) {
    await page.passInput.waitForDisplayed(10000);
    await page.passInput.clearValue();
    await page.passInput.setValue(value);
  }

  async clickLogin() {
    await page.loginButton.waitForDisplayed(10000);
    await page.loginButton.click();
  }

  async waitForLogo() {
    await page.logo.waitForDisplayed(10000);
  }

  async getNotificationText() {
    await page.errorNotification.waitForDisplayed(10000);
    return await page.errorNotification.getText();
  }
}

module.exports = LoginActions;
