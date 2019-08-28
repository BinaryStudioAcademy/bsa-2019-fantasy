class CustomWaits {
  async forSpinner() {
    const spinner = $('div.styles_box__3V1dQ');
    await spinner.then((res) => res.waitForDisplayed(10000));
    await spinner.then((res) => res.waitForDisplayed(10000, true));
  }
}

module.exports = new CustomWaits();
