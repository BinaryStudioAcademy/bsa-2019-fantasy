const fetch = require('node-fetch');

const gameweeksID = async (url, token) => {
  const response = await fetch(`${url}/gameweeks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  const ids = result.map((e) => {
    return e.id;
  });

  return ids;
};

module.exports = {
  gameweeksID,
};
