import socketIO from 'socket.io';

import { getNotification } from '../helpers/send-notification.helper';
// eslint-disable-next-line import/no-cycle
import { getFakerSocket } from './fakerSocket';

let socketInstance;

const socketHandlers = (socket) => {
  const fakerSocket = getFakerSocket();
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
    fakerSocket.emit('simulate', data);
  });
  socket.on('status', (data) => {
    console.log('checking status');
    fakerSocket.emit('status', data);
  });
  socket.on('stopSimulation', (data) => {
    console.log('event stopSimulation');
    fakerSocket.emit('stopSimulation', data);
  });
};

export const makeConnectionMain = (socketServer) => {
  if (socketInstance) return socketInstance;
  socketInstance = socketIO(socketServer);
  socketInstance.on('connection', socketHandlers);
  return socketInstance;
};

export const getMainSocket = () => socketInstance;
