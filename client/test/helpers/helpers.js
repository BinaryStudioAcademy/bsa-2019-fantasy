const credentials = require('../testData.json');

const loginSteps = require('../specs/login/steps/login.steps');

class HelpClass {
  async loginWithDefaultUser() {
    await loginSteps.submitLoginForm(credentials.email, credentials.password);
  }

  async logInAsDifferentUser() {
    await loginSteps.submitLoginForm(credentials.email2, credentials.password);
  }

  getRandomName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async browserClick(elm) {
    return await browser.execute((e) => {
      console.log(e);
      document.querySelectorAll(e).then((res) => res.click());
    }, elm);
  }
}

module.exports = new HelpClass();
