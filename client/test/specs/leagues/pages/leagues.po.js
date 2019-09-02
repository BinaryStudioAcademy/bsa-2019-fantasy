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
    this.joinLeagueBtn = '//a[@href="/leagues/join"]';
    this.createLeagueBtn = '//a[@href="/leagues/create"]';
    this.publicListItems = '//h3[text()="Public classic leagues"]/..//a';
    this.privateListItems = '//h3[text() ="Private classic leagues"]/..//a';
  }
}

module.exports = new LeaguesPage();
