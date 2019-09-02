const request = require('supertest');
const expect = require('chai').expect;

const URL = 'https://swapi.co/api/';
const PATH = 'films/2/';

const request_timeout = 20000;
for (i = 0; i < 100; i++) {
  describe('Test API', () => {
    it('validate', () => {
      // this.timeout(request_timeout);
      request(URL)
        .get(PATH)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          console.log('RES', res.body);
        });
    });
  });
}
