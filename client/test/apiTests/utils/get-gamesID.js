const fetch = require('node-fetch');

const gamesID = async (url, token, gameweekNum) => {
  const response = await fetch(`${url}/games/${gameweekNum}/gameweek`, {
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
  gamesID,
};
