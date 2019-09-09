const request = require('supertest');
const expect = require('chai').expect;
const leaguesPayload = require('./data/leagues.payload');
const data = require('./data/leagues.scenarios.json');
const Help = require('../../helpers/helpers');
const props = require('./data/leagues.schema');
const args = require('../../specs/testData.json')

const URL = 'https://fantasy-football.tk/api/';

describe('Leagues services test suite', () => {
    let payload, path, token, actualProperties;

    beforeEach(async () => {
        payload = {
            email: args.email,
            password: args.password
        };
        return await request(URL)
        .post('auth/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {
            token = await response.body.token;
        })
        .catch(e => console.error(e));
      });

    data.createLeagueScenarios.forEach(scenario => {
        const rndName = Help.getRandomName();
        it(scenario.testCaseName, async () => {
            payload = Object.assign(
                {},
                leaguesPayload.createLeaguePayload(
                  rndName,
                  scenario.private,
                  scenario.start_from
                ),
            );
            path = 'leagues';
            actualProperties = props.createLeagueSchema;
            return await request(URL)
            .post(path)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                const res = await response.body;
                actualProperties.forEach(prop => {
                    expect(res).to.have.property(prop);
                });
            });
        });
    });

    it('should get user leagues', async () =>{
        actualProperties = props.getLeaguesSchema;
        path = 'profile/leagues';
        return await request(URL)
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (response) => {
            const res = await response.body;
            actualProperties.forEach(prop => {
                expect(res).to.have.property(prop);
            });
        });
    });

    data.joinLeagueScenarios.forEach(scenario => {

        it(scenario.testCaseName, async () => {
            const privacy = scenario.private ? 'private' : 'public';
            path = `leagues/join/${privacy}`;
            payload = Object.assign(
                {},
                leaguesPayload.joinLeaguePayload(
                  scenario.code,
                  scenario.private
                ),
            );
            return await request(URL)
            .post(path)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(scenario.status)
            .then(async (response) => {
                const res = await response.body;
                const actualMessage = await res.message;
                expect(actualMessage).to.be.equal(scenario.message);
            });
        });
    });

    data.getInvitationCodeScenarios.forEach(scenario => {

        it(scenario.testCaseName, async () => {
            path = 'leagues/invitation-code';
            actualProperties = props.getInviteCodeSchema;
    
            payload = Object.assign(
                {},
                leaguesPayload.getInviteCodePayload(
                  scenario.name
                ),
            );
            return await request(URL)
            .post(path)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                const res = await response.body;
                actualProperties.forEach(prop => {
                    expect(res).to.have.property(prop);
                })
            });
        });
    });
    
    data.getLeagueDetailsScenarios.forEach(scenario => {
        it(scenario.testCaseName, async () => {
            path = `leagues/${scenario.name}`;
            actualProperties = props.leagueDetailsSchema;
            return await request(URL)
            .get(path)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const res = response.body;
                actualProperties.forEach(prop => {
                    expect(res).to.have.property(prop);
                })
            });
        });
    });

    data.leaveLeagueScenarios.forEach(scenario => {

        it(scenario.testCaseName, async () => {
            path = 'league-participants';
            payload = Object.assign(
                {},
                leaguesPayload.leaveLeaguePayload(
                  scenario.name
                ),
            );

            return await request(URL)
            .delete(path)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(payload)
            //.expect('Content-Type', /json/)
            .expect(scenario.status)
            .then(async (response) => {
                const res = await response.body;
                const actualMessage = await res.message;
                if(!res.admin_entry)
                    expect(actualMessage).to.be.equal(scenario.message);
            });
        });
    });
});