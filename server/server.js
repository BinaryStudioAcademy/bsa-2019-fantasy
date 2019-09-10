/* eslint-disable no-console */
import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';
import path from 'path';
import passport from 'passport';
import http from 'http';
import https from 'https';
import socketIO from 'socket.io';
import socketIOClient from 'socket.io-client';

import routes from './api/routes/index';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import socketInjector from './socket/injector';
import socketHandlers from './socket/handlers';
import initSchedulers from './schedulers';
import { updateDbFromFaker } from './helpers/update-db-from-faker.helper';
import recalculateUserScore from './helpers/calculate-user-score.helper';

import sequelize from './data/db/connection';

import './config/passport.config';

dotenv.config();

const app = express();
let io;

if (process.env.PROTOCOL === 'https') {
  // Certificate
  const privateKey = fs.readFileSync(`${process.env.CERT_PATH}privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${process.env.CERT_PATH}cert.pem`, 'utf8');
  const ca = fs.readFileSync(`${process.env.CERT_PATH}chain.pem`, 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTPS Server running on port ${process.env.APP_PORT}`);
  });

  // set up a server to redirect http to https
  const httpServer = express();
  httpServer.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
  httpServer.listen(8080);

  io = socketIO(httpsServer);
} else {
  const httpServer = http.createServer(app);
  httpServer.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTP Server running on port ${process.env.APP_PORT}`);
  });
  io = socketIO(httpServer);
}

const fakerSocket = socketIOClient(`http://localhost:${process.env.FAKER_SOCKET_PORT}`, {
  reconnection: true,
});

socketHandlers(io, fakerSocket);

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    await updateDbFromFaker();
    await initSchedulers();
    await recalculateUserScore();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(socketInjector(io));

routes(app, io);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

app.use(errorHandlerMiddleware);
