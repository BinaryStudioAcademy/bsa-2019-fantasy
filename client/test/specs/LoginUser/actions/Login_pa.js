const LoginPage = require('../page/Login_po');
const page = new LoginPage();

class LoginActions {
  enterEmail(value) {
    page.emailInput.waitForDisplayed(10000);
    page.emailInput.clearValue();
    page.emailInput.setValue(value);
  }

  enterPassword(value) {
    page.passInput.waitForDisplayed(2000);
    page.passInput.clearValue();
    page.passInput.setValue(value);
  }

  clickLogin() {
    page.loginButton.waitForDisplayed(2000);
    page.loginButton.click();
  }
}

module.exports = LoginActions;
