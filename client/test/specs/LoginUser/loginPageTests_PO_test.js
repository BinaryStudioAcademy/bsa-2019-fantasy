const LoginActions = require('./actions/Login_pa');
const assert = require('assert');
const credentials = require('./../testData.json');

const pageSteps = new LoginActions();

describe('Login page tests', () => {
  beforeEach(async () => {
    browser.maximizeWindow();
    return await browser.url(credentials.appUrl).catch((err) => console.log(err.message));
  });

  afterEach(async () => {
    await browser.reloadSession().catch((err) => console.log(err.message));
  });

  it('should login user with valid credentials', async () => {
    //browser.pause(20000);
    await pageSteps
      .enterEmail(credentials.email)
      .catch((err) => console.log(err.message));
    await pageSteps
      .enterPassword(credentials.password)
      .catch((err) => console.log(err.message));
    await pageSteps.clickLogin().catch((err) => console.log(err.message));
  });
});
