const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const data = require('./data/profile.scenarios.json');
const args = require('../specs/testData.json');

const URL = 'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/api/';
const PATH = `profile`;

describe('Profile services test suite', () => {
  let payload;
  let token;

  beforeEach(async (token) => {
    token = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: args.email,
          password: args.password
      })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data.token;
    });
  }, token);

  //PUT
  data.updateTeamDetailsScenarios.forEach((scenario) => {
    payload = Object.assign(
      {},
      profilePayload.updateUserTeamDetailsPayload(
        scenario.userData,
        scenario.teamMemberData,
      ),
    );
    it(scenario.testCaseName, () => {
      console.log('WORKS');
      console.log('PAYLOAD', payload);
      // request(URL)
      //   .put(`${PATH}/${userId}/${gameweekId}`)
      //   .send(payload)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

  //POST
  data.updateUserFavClubScenarios.forEach((scenario) => {
    payload = Object.assign(
      {},
      profilePayload.updateUserFavoriteClubPayload(
        scenario.clubId
      )
    );
    it(scenario.testCaseName, () => {
      // request(URL)
      //   .put(`${PATH}/favorite-club`)
      //   .send(payload)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

  //PUT
  data.updateUserSendMailTimePayload.forEach((scenario) => {
    payload = Object.assign(
      {},
      profilePayload.updateUserSendMailTimePayload(
        scenario.sendmail_time
      )
    );

    it(scenario.testCaseName, () => {
      // request(URL)
      //   .put(`${PATH}/${scenario.userId}`)
      //   .send(payload)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    })
  });

  //GET
  data.getUserSubscribedFixturesScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      // request(URL)
      //   .put(`${PATH}/fixtures-sub/${scenario.userId}`)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

  //POST
  data.updateUserFixtureSubscrScenarios.forEach((scenario) => {
    payload = Object.assign(
      {},
      profilePayload.updateUserFixtureSubscriptionPayload(
        scenario.game_id
      )
    );

    it(scenario.testCaseName, () =>{
      // request(URL)
      //   .put(`${PATH}/fixtures-sub`)
      //   .send(payload)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

  //DELETE
  data.deleteUserFixtureSubscrScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () =>{
      // request(URL)
      //   .put(`${PATH}/fixtures-sub`)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

});
