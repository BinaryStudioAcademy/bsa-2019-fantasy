import socketIOClient from 'socket.io-client';
import recalculateTeamsScore from './teamScoreRecalculator';
// eslint-disable-next-line import/no-cycle
import { getMainSocket } from './mainSocket';

let socket;

export const makeConnectionFaker = (url) => {
  const mainSocket = getMainSocket();
  if (socket) return socket;
  socket = socketIOClient(url, {
    reconnection: true,
  });
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('Connected to faker');
  });

  socket.on('event', (data) => {
    // eslint-disable-next-line no-console
    console.log('Received data from faker ', data);
    mainSocket.emit('event', data);
    recalculateTeamsScore();
  });
  return socket;
};

export const getFakerSocket = () => socket;
