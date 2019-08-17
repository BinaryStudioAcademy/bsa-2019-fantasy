export type CreateLeagueCredentials = {
  name: string;
};

export type JoinLeagueCredentials = {
  code: string;
  private: boolean;
};

export type SearchPublicLeaguesCredentials = {
  filter: string;
};
