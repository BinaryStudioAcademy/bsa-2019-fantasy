import openSocket from 'socket.io-client';

import handlers from './handlers';
import { User } from 'types/user.type';

const socket = openSocket(
  `${process.env.REACT_APP_SOCKET_SERVER_PROTOCOL}://${process.env.REACT_APP_SOCKET_SERVER}`,
);
handlers(socket);

export const joinRoom = (favorite_club) => {
  socket.emit('createRoom', favorite_club);
};

export const leaveRoom = (favorite_club) => {
  socket.emit('leaveRoom', favorite_club);
};

export const requestGames = (userId: User['id']) => {
  socket.emit('requestGames', userId);
};
