class NavHeader {
  get leaguesBtn() {
    return $('//header//a[@href="/leagues"]');
  }
}

module.exports = new NavHeader();
