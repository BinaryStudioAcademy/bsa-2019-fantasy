const credentials = require('../testData.json');

const loginSteps = require('../specs/login/steps/login.steps');

class HelpClass {
  async loginWithDefaultUser() {
    await loginSteps.submitLoginForm(credentials.email, credentials.password);
  }

  getRandomName(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
}

module.exports = new HelpClass();
