class ViewLeaguePage {
  get leaveLeagueBtn() {
    return $('//button[contains(text(), "Leave league")]');
  }
}

module.exports = new ViewLeaguePage();
