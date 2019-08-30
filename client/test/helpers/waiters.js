class CustomWaits {
  async forSpinner() {
    const spinner = $('div[class*="styles_box"]');
    await spinner.then((res) => res.waitForDisplayed(10000));
    await spinner.then((res) => res.waitForDisplayed(10000, true));
  };
}

module.exports = new CustomWaits();
