class LeaguesPage {
  get joinLeagueBtn() {
    return $('//a[@href="/leagues/join"]');
  }
  get createLeagueBtn() {
    return $('//a[@href="/leagues/create"]');
  }
  get publicListItems() {
    return $$('//h3[text()="Public classic leagues"]/..//a');
  }
}

module.exports = new LeaguesPage();
