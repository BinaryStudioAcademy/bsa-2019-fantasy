class NavSide {
    get logOutBtn() {
      return $('//div[contains(@class, "logout")]/button');
    }
  }
  
  module.exports = new NavSide();