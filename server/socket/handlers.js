import { getNotification } from '../helpers/send-notification.helper';

export default (socket) => {
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
};
