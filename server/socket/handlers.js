/* eslint-disable no-console */
import { sendNotifications } from '../helpers/fixture-notification.helper';
import recalculateTeamsScore from './teamScoreRecalculator';
import recalculateUserScore from '../helpers/calculate-user-score.helper';
import { recalculateLeagueRankingsAfterEvent } from '../helpers/calculate-league-rank';
import { updateDbFromFaker } from '../helpers/update-db-from-faker.helper';

let status = { gameStarted: false };

export default (mainServer, fakerClient) => {
  const mainHandlers = (socket) => {
    fakerClient.emit('status');

    socket.on('createRoom', (roomId) => {
      socket.join(roomId);
      socket.on('requestGames', async (userId) => {
        await sendNotifications(userId, socket);
      });
    });
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
    });

    socket.on('simulate', (data) => {
      console.log('event simulate');
      fakerClient.emit('simulate', data);
    });
    socket.on('status', (data) => {
      console.log('checking status');
      fakerClient.emit('status', data);
    });
    socket.on('stopSimulation', (data) => {
      console.log('event stopSimulation');
      fakerClient.emit('stopSimulation', data);
    });
  };

  mainServer.on('connection', mainHandlers);

  fakerClient.on('connect', () => {
    console.log('Connected to faker');
  });

  fakerClient.on('event', (data) => {
    console.log('Received data from faker ', data);
    mainServer.emit('event', data);
  });
  fakerClient.on('update', async () => {
    console.log('====> Received update request');

    // Callbacks after updated database from faker
    // Put here all logic that should be done after
    // new games genererated

    await updateDbFromFaker();
    await recalculateTeamsScore();
    await recalculateLeagueRankingsAfterEvent();
    await recalculateUserScore();
  });
  fakerClient.on('status', (data) => {
    status = { ...data };
    console.log('====> Received status');
    console.log(status);
    mainServer.emit('status', status);
  });
};
