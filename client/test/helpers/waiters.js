class CustomWaits {
  async forSpinner() {
    const spinner = $('div[class*="styles_box"]');
    await spinner.then((res) => res.waitForDisplayed(30000));
    await spinner.then((res) => res.waitForDisplayed(30000, true));
  };
}

module.exports = new CustomWaits();
