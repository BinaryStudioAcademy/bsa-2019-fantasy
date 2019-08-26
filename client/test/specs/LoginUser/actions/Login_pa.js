const LoginPage = require('../page/Login_po');
const page = new LoginPage();

class LoginActions {
  async enterEmail(value) {
    await page.emailInput.then((res) => res.waitForDisplayed(10000));
    await page.emailInput.then((res) => res.clearValue());
    await page.emailInput.then((res) => res.setValue(value));
  }

  async enterPassword(value) {
    await page.passInput.then((res) => res.waitForDisplayed(10000));
    await page.passInput.then((res) => res.clearValue());
    await page.passInput.then((res) => res.setValue(value));
  }

  async clickLogin() {
    await page.loginButton.then((res) => res.waitForDisplayed(10000));
    await page.loginButton.then((res) => res.click());
  }

  async waitForLogo() {
    await page.logo.then((res) => res.waitForDisplayed(10000));
  }
}

module.exports = LoginActions;
