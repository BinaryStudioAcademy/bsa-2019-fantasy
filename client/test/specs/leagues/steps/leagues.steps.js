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
    const leagueNameInput = await $(createPage.leagueNameInput);
    await leagueNameInput.waitForDisplayed(5000);
    await leagueNameInput.clearValue();
    await leagueNameInput.setValue(name);
  }

  async _choosePublicLeagueType() {
    const leagueTypePublicButton = await $(createPage.leagueTypePublicButton);
    await leagueTypePublicButton.scrollIntoView();
    await leagueTypePublicButton.waitForDisplayed(10000);
    await leagueTypePublicButton.click();
  }

  async _choosePrivateLeagueType() {
    const leagueTypePrivateButton = await $(createPage.leagueTypePrivateButton);
    await leagueTypePrivateButton.scrollIntoView();
    await leagueTypePrivateButton.waitForDisplayed(10000);
    //await leagueTypePrivateButton.checked = true);
    await leagueTypePrivateButton.click();
  }

  async _submitLeagueCreating() {
    const createLeagueBtn = await $(createPage.createLeagueBtn);
    await createLeagueBtn.scrollIntoView();
    await createLeagueBtn.waitForDisplayed(5000);
    await createLeagueBtn.click();
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
    const closeInviteCodeDialogBtn = await $(createPage.closeInviteCodeDialogBtn);
    await closeInviteCodeDialogBtn.click();
    return inviteCode;
  }

  async findPublicLeagueByName(name) {
    const publicListItems = await $$(page.publicListItems);
    const listLen = await publicListItems.length;
    for (let i = 0; i < listLen; i++) {
      const itemName = await publicListItems[i].getText();
      if (itemName === name) return true;
    }
    return false;
  }

  async findPrivateLeagueByName(name) {
    const privateListItems = await $$(page.privateListItems);
    const listLen = await privateListItems.length;
    for (let i = 0; i < listLen; i++) {
      const itemName = await privateListItems[i].getText();
      if (itemName === name) return true;
    }
    return false;
  }

  async _getInviteCode() {
    const inviteCodeModal = await $(createPage.inviteCodeModal);
    await inviteCodeModal.waitForDisplayed(5000);
    //await browser.pause(3000);
    const inviteCodeModalInp = await $(createPage.inviteCodeModalInp);
    await inviteCodeModalInp.waitForExist(2000);
    return await inviteCodeModalInp.getValue();
  }

  /*async _copyPrivateInviteCode() {
    await $(createPage.inviteCodeModal).waitForDisplayed(5000);
    await browser.pause(3000);
    await $(createPage.inviteCodeModalInp).waitForExist(2000);
    await $(createPage.inviteCodeModalInp).click();
  }*/
}

module.exports = new LeaguesSteps();
