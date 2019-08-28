const assert = require('assert');
const credentials = require('../../testData.json');

const Page = require('../../helpers/helpers');
const Wait = require('../../helpers/waiters');
const leaguesSteps = require('../leagues/steps/leagues.steps');
const navSteps = require('../navigation/steps/nav.steps');

describe('Leagues test suite', () => {
  beforeEach(async () => {
    browser.maximizeWindow();
    await browser.url(credentials.appUrl);
    return await Page.loginWithDefaultUser();
  });

  it('should be able to create a public league', async () => {
    await navSteps.navigateToLeagues();
    await Wait.forSpinner();
    await leaguesSteps.createPublicLeague(credentials.newLeagueName);
    //browser.pause(5000);
    return await leaguesSteps.findLeagueByName(credentials.newLeagueName).then((res) => {
      return assert.strictEqual(
        res,
        true,
        `Expected ${credentials.newLeagueName} to be on Public Leagues List`,
      );
    });
  });
});
