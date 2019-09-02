import { getFixtureSubscriptions } from '../helpers/fixture-notification.helper';
import recalculateTeamsScore from './teamScoreRecalculator';
import { updateDbFromFaker } from '../helpers/update-db-from-faker.helper';

let status = { gameStarted: false };

export default (mainServer, fakerClient) => {
  const mainHandlers = (socket) => {
    fakerClient.emit('status');

    socket.on('createRoom', (roomId) => {
      socket.join(roomId);
      socket.on('requestGames', async (userId) => {
        await getFixtureSubscriptions(userId, socket);
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
    // eslint-disable-next-line no-console
    console.log('Connected to faker');
  });

  fakerClient.on('event', (data) => {
    // eslint-disable-next-line no-console
    console.log('Received data from faker ', data);
    mainServer.emit('event', data);
    recalculateTeamsScore();
  });
  fakerClient.on('update', () => {
    // eslint-disable-next-line no-console
    console.log('====> Received update request');
    updateDbFromFaker();
  });
  fakerClient.on('status', (data) => {
    status = { ...data };
    // eslint-disable-next-line no-console
    console.log('====> Received status');
    console.log(status);
    mainServer.emit('status', status);
  });
};
