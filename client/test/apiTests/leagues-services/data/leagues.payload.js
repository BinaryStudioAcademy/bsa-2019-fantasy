const createLeaguePayload = (name, isPrivate, start_from) => {
  return {
    name: name,
    private: isPrivate, //bool
    start_from: start_from, //gameweekId
  };
};

const joinLeaguePayload = (code, isPrivate) => {
  return {
    code: code,
    private: isPrivate,
  };
};

const getInviteCodePayload = (name) => {
  return {
    name: name,
  };
};

const leaveLeaguePayload = (name) => {
  return {
    name: name,
  };
};

module.exports = {
  createLeaguePayload,
  joinLeaguePayload,
  getInviteCodePayload,
  leaveLeaguePayload,
};
