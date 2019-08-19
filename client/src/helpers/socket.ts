import openSocket from 'socket.io-client';

import handlers from './handlers';

const socket = openSocket('http://localhost:5002');
handlers(socket);

export const joinRoom = (favorite_club) => {
  socket.emit('createRoom', favorite_club);
  socket.emit('requestGames');
};
