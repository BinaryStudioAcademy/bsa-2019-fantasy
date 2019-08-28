const loginPage = require('../pages/login.po');

class LoginSteps {
  async _enterEmail(email) {
    await loginPage.emailInput.then((res) => res.waitForDisplayed(5000));
    await loginPage.emailInput.then((res) => res.clearValue());
    await loginPage.emailInput.then((res) => res.setValue(email));
  }

  async _enterPassword(password) {
    await loginPage.passwordInput.then((res) => res.waitForDisplayed(2000));
    await loginPage.passwordInput.then((res) => res.clearValue());
    await loginPage.passwordInput.then((res) => res.setValue(password));
  }

  async _clickSubmitForm() {
    await loginPage.submitBtn.then((res) => res.waitForDisplayed(2000));
    await loginPage.submitBtn.then((res) => res.click());
  }

  async submitLoginForm(email, password) {
    await this._enterEmail(email);
    await this._enterPassword(password);
    await this._clickSubmitForm();
  }
}

module.exports = new LoginSteps();
