class LeaguesPage {
  constructor() {
    this.publicLeagueLink = (leagueName) => {
      return `//h3[text() ="Public classic leagues"]/..//a[contains(@href, ${leagueName})]`;
    };
    this.privateLeagueLink = (leagueName) => {
      return $(
        `//h3[text() ="Private classic leagues"]/..//a[contains(@href, ${leagueName})]`,
      );
    };
  }
  get joinLeagueBtn() {
    return $('//a[@href="/leagues/join"]');
  }

  get createLeagueBtn() {
    return $('//a[@href="/leagues/create"]');
  }

  get publicListItems() {
    return $$('//h3[text()="Public classic leagues"]/..//a');
  }

  get privateListItems() {
    return $$('//h3[text() ="Private classic leagues"]/..//a');
  }
}

module.exports = new LeaguesPage();
