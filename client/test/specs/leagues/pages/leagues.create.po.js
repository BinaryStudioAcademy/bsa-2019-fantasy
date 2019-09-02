class CreateLeaguesPage {
  constructor() {
    this.leagueNameInput = '//input[@id="league-name"]';
    this.leagueTypePublicButton = '//input[@name="public"]/../span';
    this.leagueTypePrivateButton = '//input[@name="private"]/../span';
    this.scoringStartSelect = '//select[@id="league-gameweek"]';
    this.scoringStartSelectOptions = '//select[@id="league-gameweek"]/option';
    this.createLeagueBtn = '//button[@type="submit"]';
    this.inviteCodeModal = 'div#modal';
    this.closeInviteCodeDialogBtn =
      '//div[@id="modal"]//button[contains(@class, "close")]';
    this.inviteCodeModalInp = '//div[@id="modal"]//input[@name="code"]';
  }
}

module.exports = new CreateLeaguesPage();
