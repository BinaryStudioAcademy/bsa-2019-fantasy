class CustomWaits {
  //There is might be a reason to wait for a spinner, but it's the most unstable thing
  // So, i propose to use pause for now,
  // Ideally there is should custom step that look for spinner during 3 seconds with 0.5s interval and if no - proceed, if yes - waitForDisplayed(30000, true));

  async forSpinner() {
    const spinner = await $('div[class*="styles_box"]');
    // await spinner.waitForDisplayed(30000);
    await browser.pause(1000);
    await spinner.waitForDisplayed(30000, true);
  }
}

module.exports = new CustomWaits();
