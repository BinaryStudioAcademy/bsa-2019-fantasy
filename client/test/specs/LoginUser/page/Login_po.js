class LoginPage {
  get emailInput() {
    return $('input#email');
  }
  get passInput() {
    return $('input#password');
  }
  get loginButton() {
    return $('button[type=submit]');
  }
}

module.exports = LoginPage;
