const updateUserFavoriteClubPayload = (clubId) => {
  return {
    clubId: clubId,
  };
};

const updateUserSendMailTimePayload = (sendmail_time) => {
  return {
    sendmail_time: sendmail_time,
  };
};

const updateUserFixtureSubscriptionPayload = (user_id, game_id) => {
  return {
    user_id: user_id,
    game_id: game_id,
  };
};

const deleteUserFixtureSubscrPayload = (user_id, game_id) => {
  return {
    user_id: user_id,
    game_id: game_id,
  };
};

const updateUserTeamDetailsPayload = (user_id, userData, teamMemberData) => {
  return {
    user_id: user_id,
    userData: userData,
    teamMemberData: teamMemberData,
  };
};

module.exports = {
  updateUserTeamDetailsPayload,
  updateUserFavoriteClubPayload,
  updateUserSendMailTimePayload,
  updateUserFixtureSubscriptionPayload,
  deleteUserFixtureSubscrPayload,
};
