const request = require('supertest');
const expect = require('chai').expect;
const leaguesPayload = require('./data/leagues.payload');
const data = require('./data/profile.scenarios.json');
const Help = require('../../helpers/helpers');
const props = require('../leagues-services/data/leagues.schema');

const URL = 'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5001/api/';

describe('Profile services test suite', () => {
    let payload, path, token, actualProperties;

    beforeEach(async (token) => {
        path = 'auth/login'
        response = await fetch(`${appUrl}/${path}`, {
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
        });
        token = response.token;
      }, token);

    data.createLeagueScenarios.forEach(scenario => {
        actualProperties = props.createLeagueSchema;
        path = '/leagues';
        const rndName = Help.getRandomName();
        payload = Object.assign(
            {},
            leaguesPayload.createLeaguePayload(
              rndName,
              scenario.private,
              scenario.start_from
            ),
        );
        it(scenario.testCaseName, () => {
            return request(URL)
            .post(`${path}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                actualProperties.forEach(prop => {
                    expect(response).to.have.property(prop);
                });
            });
        });
    });

    it('should get user leagues', () =>{
        actualProperties = props.getLeaguesSchema;
        path = '/profile/leagues';
        return request(URL)
        .get(`${path}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            actualProperties.forEach(prop => {
                expect(response).to.have.property(prop);
            });
        });
    });

    data.joinLeagueScenarios.forEach(scenario => {
        const privacy = scenario.private ? 'private' : 'public';
        path = `leagues/join/${privacy}`;
        payload = Object.assign(
            {},
            leaguesPayload.joinLeaguePayload(
              scenario.code,
              scenario.private
            ),
        );

        it(scenario.testCaseName, () => {
            return request(URL)
            .post(`${path}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(scenario.status)
            .then((response) => {
                expect(response.message).to.be.equal(scenario.message);
            });
        });
    });

    data.getInvitationCodeScenarios.forEach(scenario => {
        path = '/leagues/invitation-code';
        actualProperties = props.getInviteCodeSchema;

        payload = Object.assign(
            {},
            leaguesPayload.getInviteCodePayload(
              scenario.code
            ),
        );

        it(scenario.testCaseName, () => {
            return request(URL)
            .post(`${path}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                actualProperties.forEach(prop => {
                    expect(response).to.have.property(prop);
                })
            });
        });
    });
    
    data.getLeagueDetailsScenarios.forEach(scenario => {
        path = `/leagues/${scenario.name}`;
        actualProperties = props.leagueDetailsSchema;
        it(scenario.testCaseName, () => {
            return request(URL)
            .get(`${path}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                actualProperties.forEach(prop => {
                    expect(response).to.have.property(prop);
                })
            });
        });
    });

    data.leaveLeagueScenarios.forEach(scenario => {
        path = '/league-participants';
        payload = Object.assign(
            {},
            leaguesPayload.leaveLeaguePayload(
              scenario.name
            ),
        );

        it(scenario.testCaseName, () => {
            return request(URL)
            .delete(`${path}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(scenario.status)
            .then((response) => {
                if(!response.admin_entry)
                    expect(response.message).to.be.equal(scenario.message);
            });
        });
    });
});