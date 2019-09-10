const getClientURL = () => `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}`;

export default getClientURL;
