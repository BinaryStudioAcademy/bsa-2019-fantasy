export type User = {
  id: string;
  name: string;
  email: string;
  money: number;
  score: number;

  chip_used: string;
  team_name: string;
  favorite_club_id: number;

  facebook_id: string;

  free_transfers: number;
  sendmail_time: number | null;

  createdAt: string;
  updatedAt: string;
};

export type UserTeamDetails = {
  team_name: string;
  money: number;
};
