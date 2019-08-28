import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:${process.env.FAKER_SOCKET_PORT}/api/`,
});
