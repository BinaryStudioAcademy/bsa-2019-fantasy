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

  get privateListItems(){
    return $$('//h3[text() ="Private classic leagues"]/..//a');
  }

  get publicLeagueLink(leagueName){
    return $(`//h3[text() ="Public classic leagues"]/..//a[contains(@href, ${leagueName})]`);
  };

  get privateLeagueLink(leagueName){
    return $(`//h3[text() ="Private classic leagues"]/..//a[contains(@href, ${leagueName})]`);
  }
}

module.exports = new LeaguesPage();
