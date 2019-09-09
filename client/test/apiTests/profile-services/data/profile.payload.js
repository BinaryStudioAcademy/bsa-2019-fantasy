const updateUserFavoriteClubPayload = (clubId) => {
    return{
        clubId: clubId
    };
};

const updateUserSendMailTimePayload = (sendmail_time) =>{
    return{
        userId: '',
        sendmail_time = sendmail_time
    };
};

const updateUserFixtureSubscriptionPayload = (game_id) => {
    return{
        userId: '',
        game_id: game_id
    };
};

const updateUserTeamDetailsPayload = (userData, teamMemberData) => {
  return {
    userId: '',
    gameweekId: '',
    userData: userData,
    teamMemberData: teamMemberData,
  };
};

module.exports = { 
    updateUserTeamDetailsPayload,
    updateUserFavoriteClubPayload,
    updateUserSendMailTimePayload,
    updateUserFixtureSubscriptionPayload 
};
