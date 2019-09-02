class JoinLeaguesPage {
  constructor(){
    this.publicLeagueCodeInp = '//label[@for="public-league-name"]/..//input';
    this.joinPublicLeagueBtn = '//label[@for="public-league-name"]/../../../button';
    this.privateLeagueCodeInp = '//label[@for="league-code"]/..//input';
    this.joinPrivateLeagueBtn = '//label[@for="league-code"]/../../../button';
  }
}

module.exports = new JoinLeaguesPage();
