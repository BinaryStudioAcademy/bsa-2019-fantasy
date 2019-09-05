const updateUserTeamDetailsPayload = (userData, teamMemberData) => {
  return {
    userId: '',
    gameweekId: '',
    userData: userData,
    teamMemberData: teamMemberData,
  };
};

const favouriteClubPayload = (clubId) => {
  return {
    clubId: clubId,
  };
};

module.exports = { updateUserTeamDetailsPayload, favouriteClubPayload };
