import openSocket from 'socket.io-client';

import handlers from './handlers';

const socket = openSocket(`http://${process.env.REACT_APP_FAKER_SOCKET_SERVER}:${process.env.REACT_APP_SOCKET_SERVER_PORT}`);
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
