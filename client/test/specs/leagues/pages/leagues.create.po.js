class CreateLeaguesPage {
  get leagueNameInput() {
    return $('//input[@id="league-name"]');
  }
  get leagueTypePublicButton() {
    return $('//input[@name="public"]/../span');
  }
  get leagueTypePrivateButton() {
    return $('//input[@name="private"]/../span');
  }
  get scoringStartSelect() {
    return $('//select[@id="league-gameweek"]');
  }
  get scoringStartSelectOptions() {
    return $$('//select[@id="league-gameweek"]/option');
  }
  get createLeagueBtn() {
    return $('//button[@type="submit"]');
  }
  get inviteCodeModal(){
    return $('div#modal');
  }
  get closeInviteCodeDialogBtn(){
    return $('//div[@id="modal"]//button[contains(@class, "close")]');
  }

  get inviteCodeModalInp(){
    return $('//div[@id="modal"]//input[@name="code"]');
  }
}

module.exports = new CreateLeaguesPage();
