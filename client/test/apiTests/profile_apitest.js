const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const data = require('./data/profile.scenarios.json');

const URL = 'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/api/profile/';

describe('Profile services test suite', () => {
  let payload, PATH;

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
      //   .put(`/${userId}/${gameweekId}`)
      //   .send(payload)
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .then((res) => {
      //     // console.log('OK?', res.status);
      //   });
    });
  });

  it('should change favourite club', () => {
    const randomClubID = Math.floor(Math.random() * 20 + 1);
    payload = Object.assign({}, profilePayload.favouriteClubPayload(randomClubID));
    PATH = 'favorite-club';
    request(URL)
      .post(PATH)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .auth('test1@test.com', '12345678')
      .send(payload)
      .expect(200)
      .then((res) => {
        console.log('RESPONSE', res.message);
      });
  });
});
