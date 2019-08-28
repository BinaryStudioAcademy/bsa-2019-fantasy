const credentials = require('../testData.json');

const loginSteps = require('../specs/login/steps/login.steps');

class HelpClass {
  async loginWithDefaultUser() {
    await loginSteps.submitLoginForm(credentials.email, credentials.password);
  }
}

module.exports = new HelpClass();
