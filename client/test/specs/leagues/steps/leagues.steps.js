const page = require('../pages/leagues.po');
const joinPage = require('../pages/leagues.join.po');
const createPage = require('../pages/leagues.create.po');
const viewPage = require('../pages/leagues.view.po');
const Wait = require('../../../helpers/waiters');
const Help = require('../../../helpers/helpers');

class LeaguesSteps {
  async _clickJoinLeagueBtn() {
    const joinLeagueBtn = await $(page.joinLeagueBtn);
    await joinLeagueBtn.waitForDisplayed(2000);
    await browser.pause(5000);
    await joinLeagueBtn.click();
    //await Help.browserClick(joinLeagueBtn);
  }

  async _enterPublicLeagueJoinCode(value) {
    const publicLeagueCodeInp = await $(joinPage.publicLeagueCodeInp);
    await publicLeagueCodeInp.waitForDisplayed(2000);
    await publicLeagueCodeInp.clearValue();
    await publicLeagueCodeInp.setValue(value);
  }

  async _clickSubmitPublicLeagueJoin() {
    const joinPublicLeagueBtn = await $(joinPage.joinPublicLeagueBtn);
    await joinPublicLeagueBtn.waitForDisplayed();
    await joinPublicLeagueBtn.click();
  }

  async joinPublicLeague(code) {
    await this._clickJoinLeagueBtn();
    await this._enterPublicLeagueJoinCode(code);
    await this._clickSubmitPublicLeagueJoin();
  }

  async _enterPrivateLeagueJoinCode(value) {
    const privateLeagueCodeInp = await $(joinPage.privateLeagueCodeInp);
    await privateLeagueCodeInp.waitForDisplayed(2000);
    //await joinPage.privateLeagueCodeInp.then(res => res.click());
    //await browser.keyes(['Meta', 'v']);
    await privateLeagueCodeInp.clearValue();
    await privateLeagueCodeInp.setValue(value);
  }

  async _clickSubmitPrivateLeagueJoin() {
    const joinPrivateLeagueBtn = await $(joinPage.joinPrivateLeagueBtn);
    await joinPrivateLeagueBtn.scrollIntoView();
    await joinPrivateLeagueBtn.waitForDisplayed(2000);
    await joinPrivateLeagueBtn.click();
  }

  async joinPrivateLeague(value) {
    await this._clickJoinLeagueBtn();
    await browser.pause(5000);
    await this._enterPrivateLeagueJoinCode(value);
    await this._clickSubmitPrivateLeagueJoin();
  }

  async _clickCreateLeagueBtn() {
    const createLeagueBtn = await $(page.createLeagueBtn);
    await createLeagueBtn.waitForDisplayed(2000);
    await createLeagueBtn.click();
  }

  async _enterLeagueName(name) {
    await $(createPage.leagueNameInput).waitForDisplayed(5000);
    await $(createPage.leagueNameInput).clearValue();
    await $(createPage.leagueNameInput).setValue(name);
  }

  async _choosePublicLeagueType() {
    await $(createPage.leagueTypePublicButton).scrollIntoView();
    await $(createPage.leagueTypePublicButton).waitForDisplayed(10000);
    await $(createPage.leagueTypePublicButton).click();
  }

  async _choosePrivateLeagueType() {
    await $(createPage.leagueTypePrivateButton).scrollIntoView();
    await $(createPage.leagueTypePrivateButton).waitForDisplayed(10000);
    //await $(createPage.leagueTypePrivateButton).checked = true);
    await $(createPage.leagueTypePrivateButton).click();
  }

  async _submitLeagueCreating() {
    await $(createPage.createLeagueBtn).scrollIntoView();
    await $(createPage.createLeagueBtn).waitForDisplayed(5000);
    await $(createPage.createLeagueBtn).click();
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
    //await $(createPage.inviteCodeModal).waitForDisplayed(5000);
    //await this._copyPrivateInviteCode();
    await $(createPage.closeInviteCodeDialogBtn).click();
    return inviteCode;
  }

  async findPublicLeagueByName(name) {
    const publicListItems = await $(page.publicListItems);
    const listLen = await publicListItems.length;
    for (let i = 0; i < listLen; i++) {
      const itemName = await publicListItems[i].getText();
      if (itemName === name) return true;
    }
    return false;
  }

  async findPrivateLeagueByName(name) {
    const privateListItems = await $(page.privateListItems);
    const listLen = await privateListItems.length;
    for (let i = 0; i < listLen; i++) {
      const itemName = await privateListItems[i].getText();
      if (itemName === name) return true;
    }
    return false;
  }

  async _getInviteCode() {
    await $(createPage.inviteCodeModal).waitForDisplayed(5000);
    await browser.pause(3000);
    await $(createPage.inviteCodeModalInp).waitForExist(2000);
    return await $(createPage.inviteCodeModalInp).getValue();
  }

  async _copyPrivateInviteCode() {
    await $(createPage.inviteCodeModal).waitForDisplayed(5000);
    await browser.pause(3000);
    await $(createPage.inviteCodeModalInp).waitForExist(2000);
    await $(createPage.inviteCodeModalInp).click();
  }
}

module.exports = new LeaguesSteps();
