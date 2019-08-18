const getClientURL = () => `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

export default getClientURL;
