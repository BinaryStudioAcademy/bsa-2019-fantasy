const request = require('supertest');
const expect = require('chai').expect;
const leaguesPayload = require('./data/leagues.payload');
const data = require('./data/leagues.scenarios.json');
const Help = require('../../helpers/helpers');
const props = require('./data/leagues.schema');
const args = require('../../specs/testData.json');

const URL = 'https://fantasy-football.tk/api/';

describe('Leagues services test suite', () => {
  let payload, path, token, actualProperties;

  beforeEach(() => {
    payload = {
      email: args.email,
      password: args.password,
    };
    return request(URL)
      .post('auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        token = response.body.token;
      })
      .catch((e) => console.error(e));
  });

  data.createLeagueScenarios.forEach((scenario) => {
    const rndName = Help.getRandomName();
    it(scenario.testCaseName, () => {
      payload = Object.assign(
        {},
        leaguesPayload.createLeaguePayload(
          rndName,
          scenario.private,
          scenario.start_from,
        ),
      );
      path = 'leagues';
      actualProperties = props.createLeagueSchema;
      return request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          actualProperties.forEach((prop) => {
            expect(response.body).to.have.property(prop);
          });
        });
    });
  });

  it('should get user leagues', () => {
    actualProperties = props.getLeaguesSchema;
    path = 'profile/leagues';
    return request(URL)
      .get(path)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        actualProperties.forEach((prop) => {
          expect(response.body).to.have.property(prop);
        });
      });
  });

  data.joinLeagueScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      const privacy = scenario.private ? 'private' : 'public';
      path = `leagues/join/${privacy}`;
      payload = Object.assign(
        {},
        leaguesPayload.joinLeaguePayload(scenario.code, scenario.private),
      );
      return request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(scenario.status)
        .then((response) => {
          expect(response.body.message).to.be.equal(scenario.message);
        });
    });
  });

  data.getInvitationCodeScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      path = 'leagues/invitation-code';
      actualProperties = props.getInviteCodeSchema;

      payload = Object.assign({}, leaguesPayload.getInviteCodePayload(scenario.name));
      return request(URL)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          actualProperties.forEach((prop) => {
            expect(response.body).to.have.property(prop);
          });
        });
    });
  });

  data.getLeagueDetailsScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      path = `leagues/${scenario.name}`;
      actualProperties = props.leagueDetailsSchema;
      return request(URL)
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          actualProperties.forEach((prop) => {
            expect(response.body).to.have.property(prop);
          });
        });
    });
  });

  data.leaveLeagueScenarios.forEach((scenario) => {
    it(scenario.testCaseName, () => {
      path = 'league-participants';
      payload = Object.assign({}, leaguesPayload.leaveLeaguePayload(scenario.name));

      return (
        request(URL)
          .delete(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send(payload)
          //.expect('Content-Type', /json/)
          .expect(scenario.status)
          .then((response) => {
            if (!response.admin_entry)
              expect(response.body.message).to.be.equal(scenario.message);
          })
      );
    });
  });
});
