class CreateLeaguesPage {
  get leagueNameInput() {
    return $('//input[@id="league-name"]');
  }
  get leagueTypePublicButton() {
    return $('//input[@name="public"]');
  }
  get leagueTypePrivateButton() {
    return $('//input[@name="private"]');
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
}

module.exports = new CreateLeaguesPage();
