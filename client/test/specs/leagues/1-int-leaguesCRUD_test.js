const assert = require('assert');
const credentials = require('../../testData.json');

const Page = require('../../helpers/helpers');
const Wait = require('../../helpers/waiters');
const leaguesSteps = require('./steps/leagues.steps');
const navSteps = require('../navigation/steps/nav.steps');

describe('Leagues test suite', () => {
  beforeEach(async () => {
    browser.maximizeWindow();
    await browser.url(credentials.appUrl);

    await Page.loginWithDefaultUser();
    await Wait.forSpinner();
    await navSteps.navigateToLeagues();

  });

  afterEach(async() => {
    await browser.reloadSession();
  });

  xit('should be able to create a public league', async () => {
    const leagueName = Page.getRandomName();
    await leaguesSteps.createPublicLeague(leagueName);
    await browser.pause(3000);
    const isPresent = await leaguesSteps.findPublicLeagueByName(leagueName);
    assert.strictEqual(
        isPresent,
        true,
        `Expected ${leagueName} to be on Public Leagues List`,
      );
  });

  xit('should be able to create a private league', async() => {
    const leagueName = Page.getRandomName();
    await leaguesSteps.createPrivateLeague(leagueName);
    await browser.pause(3000);

    const isPresent = await leaguesSteps.findPrivateLeagueByName(leagueName);
    return await assert.strictEqual(
        isPresent,
        true,
        `Expected ${leagueName} to be on Private Leagues List`,
    );
  });

  it('should be able to join a public league', async() => {
    const leagueName = Page.getRandomName();
    await leaguesSteps.createPublicLeague(leagueName);
    await navSteps.clicklogOutBtn();
    await Page.logInAsDifferentUser();
    await navSteps.navigateToLeagues();
    await leaguesSteps.joinPublicLeague(leagueName);
    await browser.pause(3000);
    const isPresent = await leaguesSteps.findPublicLeagueByName(leagueName);
    return await assert.strictEqual(
      isPresent,
      true,
      `Expected ${leagueName} to be on Public Leagues List`
    );
  });

  it('should be able to join a private league', async() =>{
    const leagueName = Page.getRandomName();
    const inviteCode = await leaguesSteps.createPrivateLeague(leagueName);
    await navSteps.clicklogOutBtn();
    await Page.logInAsDifferentUser();
    await navSteps.navigateToLeagues();
    await browser.pause(2000);
    await leaguesSteps.joinPrivateLeague(inviteCode);
    await browser.pause(3000);
    const isPresent = await leaguesSteps.findPrivateLeagueByName(leagueName);
    return await assert.strictEqual(
        isPresent,
        true,
        `Expected ${leagueName} to be on Private Leagues List`,
    );
  });
});
