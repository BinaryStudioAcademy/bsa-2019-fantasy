const LoginActions = require('./actions/Login_pa');
const assert = require('assert');
const credentials = require('./../testData.json');

const pageSteps = new LoginActions();

describe('Login page tests', () => {
  beforeEach(() => {
    browser.maximizeWindow();
    browser.url(credentials.appUrl);
  });

  afterEach(() => {
    browser.reloadSession();
  });

  it('should login user with valid credentials', () => {
    browser.pause(20000);
    pageSteps.enterEmail(credentials.email);
    pageSteps.enterPassword(credentials.password);
    pageSteps.clickLogin();
  });
});
