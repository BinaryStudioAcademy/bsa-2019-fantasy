import { getNotification } from '../helpers/send-notification.helper';
import recalculateTeamsScore from './teamScoreRecalculator';

export default (mainServer, fakerClient) => {
  const mainHandlers = (socket) => {
    socket.on('createRoom', (roomId) => {
      socket.join(roomId);
      socket.on('requestGames', async () => {
        const notification = await getNotification(roomId);
        socket.emit('displayNotification', notification);
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
};
