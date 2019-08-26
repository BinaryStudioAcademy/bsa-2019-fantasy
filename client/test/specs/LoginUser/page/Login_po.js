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
  get logo() {
    return $('a.styles_sidebar-logo__1hXCu');
  }
}

module.exports = LoginPage;
