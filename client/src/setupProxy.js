// @ts-ignore
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://' + process.env.API_HOST + ':' + process.env.API_PORT + '/',
    }),
  );
};
