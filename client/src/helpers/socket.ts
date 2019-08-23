import openSocket from 'socket.io-client';

import handlers from './handlers';

const socket = openSocket('http://localhost:5002');
handlers(socket);

export const joinRoom = (favorite_club) => {
  socket.emit('createRoom', favorite_club);
};

export const leaveRoom = (favorite_club) => {
  socket.emit('leaveRoom', favorite_club);
};

export const requestGames = () => {
  socket.emit('requestGames');
};
