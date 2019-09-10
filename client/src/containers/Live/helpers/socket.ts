import socketIOClient from 'socket.io-client';

const endpoint = `${process.env.REACT_APP_SOCKET_SERVER_PROTOCOL}://${process.env.REACT_APP_SOCKET_SERVER}:${process.env.REACT_APP_SOCKET_SERVER_PORT}/`;
const socket = socketIOClient(endpoint);

export const simulate = ({ homeClubId, awayClubId }) => {
  socket.emit('simulate', {
    homeClub: homeClubId,
    awayClub: awayClubId,
  });
};

export const stopSimulation = () => {
  socket.emit('stopSimulation');
};
