const loginPage = require('../page/login.po');

class LoginSteps {
  async _enterEmail(email) {
    const emailInput = await $(loginPage.emailInput);
    await emailInput.waitForDisplayed(5000);
    await emailInput.clearValue();
    await emailInput.setValue(email);
  }

  async _enterPassword(password) {
    const passwordInput = await $(loginPage.passwordInput);
    await passwordInput.waitForDisplayed(2000);
    await passwordInput.clearValue();
    await passwordInput.setValue(password);
  }

  async _clickSubmitForm() {
    const submitBtn = await $(loginPage.submitBtn);
    await submitBtn.waitForDisplayed(2000);
    await submitBtn.click();
  }

  async submitLoginForm(email, password) {
    await this._enterEmail(email);
    await this._enterPassword(password);
    await this._clickSubmitForm();
  }
}

module.exports = new LoginSteps();
