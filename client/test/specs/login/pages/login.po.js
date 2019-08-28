class LoginPage {
  get emailInput() {
    return $('//input[@id="email"]');
  }
  get passwordInput() {
    return $('//input[@id="password"]');
  }
  get submitBtn() {
    return $('//button[@type="submit"]');
  }
}

module.exports = new LoginPage();
