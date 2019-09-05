const request = require('supertest');
const expect = require('chai').expect;
const profilePayload = require('./data/profile.payload');
const data = require('./data/profile.scenarios.json');

const URL = 'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/api/';
const PATH = `profile`;

describe('Profile services test suite', () => {
  let payload;

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
});
