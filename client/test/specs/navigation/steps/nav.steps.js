const navHeader = require('../pages/nav.header.po');
const navSide = require('../pages/nav.sidebar.po');

class NavSteps {
  async navigateToLeagues() {
    const leaguesBtn = await $(navHeader.leaguesBtn);
    await leaguesBtn.waitForDisplayed(2000);
    await leaguesBtn.click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return String(currentUrl).includes('/leagues') === true;
      },
      5000,
      `Navigation to /leagues failed after 5s`,
    );
  }

  async clicklogOutBtn() {
    const logOutBtn = await $(navSide.logOutBtn);
    await logOutBtn.waitForDisplayed(2000);
    await logOutBtn.click();
  }
}

module.exports = new NavSteps();
