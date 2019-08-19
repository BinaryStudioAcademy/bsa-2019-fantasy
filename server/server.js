import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';
import path from 'path';
import passport from 'passport';
import http from 'http';
import socketIO from 'socket.io';
import socketIOClient from 'socket.io-client';

import routes from './api/routes/index';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import socketInjector from './socket/injector';
import socketHandlers from './socket/handlers';
import initSchedulers from './schedulers';
import recalculateTeamsScore from './socket/teamScoreRecalculator';

import sequelize from './data/db/connection';

import './config/passport.config';

dotenv.config();

const app = express();
const socketServer = http.Server(app);
const io = socketIO(socketServer);

const fakerSocket = socketIOClient.connect(
  `http://localhost:${process.env.FAKER_SOCKET_PORT}`,
  { reconnection: true },
);

fakerSocket.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected');

  fakerSocket.on('someEvent', (data) => {
    // eslint-disable-next-line no-console
    console.log('Received data from faker ', data);

    recalculateTeamsScore()
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    initSchedulers();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

io.on('connection', socketHandlers);

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
app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.APP_PORT}!`);
});

socketServer.listen(process.env.SOCKET_PORT);
