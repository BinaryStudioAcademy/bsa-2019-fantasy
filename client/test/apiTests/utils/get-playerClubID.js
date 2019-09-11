const fetch = require('node-fetch');

const playersClubID = async (url, token) => {
  const response = await fetch(`${url}/players`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  const ids = result.rows.map((e) => {
    return e.club_id;
  });

  return ids;
};

module.exports = {
  playersClubID,
};
