class LoginPage {
  constructor() {
    this.emailInput = '//input[@id="email"]';
    this.passwordInput = '//input[@id="password"]';
    this.submitBtn = '//button[@type="submit"]';
  }
}

module.exports = new LoginPage();
