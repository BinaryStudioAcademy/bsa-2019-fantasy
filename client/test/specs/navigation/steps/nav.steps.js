const navHeader = require('../pages/nav.header.po');

class NavSteps {
  async navigateToLeagues() {
    await navHeader.leaguesBtn.then((res) => res.waitForDisplayed(2000));
    await navHeader.leaguesBtn.then((res) => res.click());
  }
}

module.exports = new NavSteps();
