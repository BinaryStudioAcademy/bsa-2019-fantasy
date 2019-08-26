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
  get incorrectEmailNotification() {
    return $('div.styles_notificationItem__16cw3>span.mx-2');
  }
}

module.exports = LoginPage;
