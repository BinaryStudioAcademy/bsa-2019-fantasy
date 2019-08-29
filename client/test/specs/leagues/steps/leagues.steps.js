const page = require('../pages/leagues.po');
const joinPage = require('../pages/leagues.join.po');
const createPage = require('../pages/leagues.create.po');

class LeaguesSteps {
  async _clickJoinLeagueBtn() {
    await page.joinLeagueBtn.then((res) => res.waitForDisplayed(2000));
    await page.joinLeagueBtn.then((res) => res.click());
  }

  async _enterPublicLeagueJoinCode(value) {
    await joinPage.publicLeagueCodeInp.then((res) => res.waitForDisplayed(2000));
    await joinPage.publicLeagueCodeInp.then((res) => res.clearValue());
    await joinPage.publicLeagueCodeInp.then((res) => res.setValue(value));
  }

  async _clickSubmitPublicLeagueJoin() {
    await joinPage.joinPublicLeagueBtn.then((res) => res.waitForDisplayed());
    await joinPage.joinPublicLeagueBtn.then((res) => res.click());
  }

  async joinPublicLeague(code) {
    await this._clickJoinLeagueBtn();
    await this._enterPublicLeagueJoinCode(code);
    await this._clickSubmitPublicLeagueJoin();
  }

  async _enterPrivateLeagueJoinCode(value) {
    await joinPage.privateLeagueCodeInp.then((res) => res.waitForDisplayed(2000));
    await joinPage.privateLeagueCodeInp.then((res) => res.clearValue());
    await joinPage.privateLeagueCodeInp.then((res) => res.setValue(value));
  }

  async _clickSubmitPrivateLeagueJoin() {
    await joinPage.joinPrivateLeagueBtn.then((res) => res.waitForDisplayed());
    await joinPage.joinPrivateLeagueBtn.then((res) => res.click());
  }

  async joinPrivateLeague(code) {
    await this._clickJoinLeagueBtn();
    await this._enterPrivateLeagueJoinCode(code);
    await this._clickSubmitPrivateLeagueJoin();
  }

  async _clickCreateLeagueBtn() {
    await page.createLeagueBtn.then((res) => res.waitForDisplayed(2000));
    await page.createLeagueBtn.then((res) => res.click());
  }

  async _enterLeagueName(name) {
    await createPage.leagueNameInput.then((res) => res.waitForDisplayed(5000));
    await createPage.leagueNameInput.then((res) => res.clearValue());
    await createPage.leagueNameInput.then((res) => res.setValue(name));
  }

  async _choosePublicLeagueType() {
    await createPage.leagueTypePublicButton.then((res) => res.waitForEnabled(5000));
    await createPage.leagueTypePublicButton.then((res) => res.scrollIntoView());
    await createPage.leagueTypePublicButton.then((res) => (res.checked = true));
  }

  async _choosePrivateLeagueType() {
    await createPage.leagueTypePrivateButton.then((res) => res.waitForEnabled(5000));
    await createPage.leagueTypePrivateButton.then((res) => res.scrollIntoView());
    await createPage.leagueTypePrivateButton.then((res) => (res.checked = true));
  }

  async _submitLeagueCreating() {
    await createPage.createLeagueBtn.then((res) => res.scrollIntoView());
    await createPage.createLeagueBtn.then((res) => res.waitForDisplayed(5000));
    await createPage.createLeagueBtn.then((res) => res.click());
  }

  async createPublicLeague(name) {
    await this._clickCreateLeagueBtn();
    await this._enterLeagueName(name);
    await this._choosePublicLeagueType();
    await this._submitLeagueCreating();
  }

  async createPrivateLeague(name) {
    await this._clickCreateLeagueBtn();
    await this._enterLeagueName(name);
    await this._choosePrivateLeagueType();
    await this._submitLeagueCreating();
  }

  async findPublicLeagueByName(name) {
    const listLen = await page.publicListItems.then((res) => {
      return res.length;
    });
    for (let i = 0; i < listLen; i++) {
      //await page.publicListItems.then(res => res[i].waitForDisplayed(2000));
      const itemName = await page.publicListItems.then((res) => {
        return res[i].getText();
      });
      if (itemName === name) return true;
    }
    return false;
  }

  async findPrivateLeagueByName(name){
    
  }
}

module.exports = new LeaguesSteps();
