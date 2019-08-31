const page = require('../pages/leagues.po');
const joinPage = require('../pages/leagues.join.po');
const createPage = require('../pages/leagues.create.po');
const Wait = require('../../../helpers/waiters');
const Help = require('../../../helpers/helpers');

class LeaguesSteps {

  async _clickJoinLeagueBtn() {
    await page.joinLeagueBtn.then((res) => res.waitForDisplayed(2000));
    await browser.pause(5000);
    await page.joinLeagueBtn.then(res => res.click())
    //await page.joinLeagueBtn.then((res) => Help.browserClick(res));
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
    //await joinPage.privateLeagueCodeInp.then(res => res.click());
    //await browser.keyes(['Meta', 'v']);
    await joinPage.privateLeagueCodeInp.then((res) => res.clearValue());
    await joinPage.privateLeagueCodeInp.then((res) => res.setValue(value));
  }

  async _clickSubmitPrivateLeagueJoin() {
    await joinPage.joinPrivateLeagueBtn.then(res => res.scrollIntoView());
    await joinPage.joinPrivateLeagueBtn.then((res) => res.waitForDisplayed(2000));
    await joinPage.joinPrivateLeagueBtn.then((res) => res.click());
  }

  async joinPrivateLeague(value) {
    await this._clickJoinLeagueBtn();
    await browser.pause(5000);
    await this._enterPrivateLeagueJoinCode(value);
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
    await createPage.leagueTypePublicButton.then((res) => res.scrollIntoView());
    await createPage.leagueTypePublicButton.then((res) => res.waitForDisplayed(10000));
    await createPage.leagueTypePublicButton.then((res) => (res.click()));
  }

  async _choosePrivateLeagueType() {
    await createPage.leagueTypePrivateButton.then((res) => res.scrollIntoView());
    await createPage.leagueTypePrivateButton.then((res) => res.waitForDisplayed(10000));
    //await createPage.leagueTypePrivateButton.then(res => res.checked = true);
    await createPage.leagueTypePrivateButton.then(res => res.click());
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
    const inviteCode = await this._getInviteCode();
    //await createPage.inviteCodeModal.then(res => res.waitForDisplayed(5000));
    //await this._copyPrivateInviteCode();
    await createPage.closeInviteCodeDialogBtn.then(res => res.click());
    return inviteCode;
  }

  async findPublicLeagueByName(name) {
    const listLen = await page.publicListItems.then((res) => {
      return res.length;
    });
    for (let i = 0; i < listLen; i++) {
      const itemName = await page.publicListItems.then((res) => {
        return res[i].getText();
      });
      if (itemName === name) return true;
    }
    return false;
  }

  async findPrivateLeagueByName(name){
    const listLen = await page.privateListItems.then((res) => {
      return res.length;
    });
    for (let i = 0; i < listLen; i++) {
      const itemName = await page.privateListItems.then((res) => {
        return res[i].getText();
      });
      if (itemName === name) return true;
    }
    return false;
  };

  async _getInviteCode(){
    await createPage.inviteCodeModal.then(res => res.waitForDisplayed(5000));
    await browser.pause(3000);
    await createPage.inviteCodeModalInp.then(res => res.waitForExist(2000));
    return await createPage.inviteCodeModalInp.then(res => res.getValue());
  }

  async _copyPrivateInviteCode(){
    await createPage.inviteCodeModal.then(res => res.waitForDisplayed(5000));
    await browser.pause(3000);
    await createPage.inviteCodeModalInp.then(res => res.waitForExist(2000));
    await createPage.inviteCodeModalInp.then(res => res.click());
  };
}

module.exports = new LeaguesSteps();
