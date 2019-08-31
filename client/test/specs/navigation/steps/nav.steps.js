const navHeader = require('../pages/nav.header.po');
const navSide = require('../pages/nav.sidebar.po');

class NavSteps {
  async navigateToLeagues() {
    await navHeader.leaguesBtn.then((res) => res.waitForDisplayed(2000));
    await navHeader.leaguesBtn.then((res) => res.click());
  }

  async clicklogOutBtn(){
    await navSide.logOutBtn.then(res => res.waitForDisplayed(2000));
    await navSide.logOutBtn.then(res => res.click());
  }
}

module.exports = new NavSteps();
