class JoinLeaguesPage {
  get publicLeagueCodeInp() {
    return $('//label[@for="public-league-name"]/..//input');
  }
  get joinPublicLeagueBtn() {
    return $('//label[@for="public-league-name"]/../../../button');
  }
  get privateLeagueCodeInp() {
    return $('//label[@for="league-code"]/..//input');
  }
  get joinPrivateLeagueBtn() {
    return $('//label[@for="league-code"]/../../../button');
  }
}

module.exports = new JoinLeaguesPage();
