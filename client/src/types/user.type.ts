export type Image = {
  id: string;
  link: string;
  deleteHash: string;
};

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
  club_email: boolean;
  club_notif: boolean;
  team_email: boolean;
  team_notif: boolean;

  image: Image | null;
  createdAt: string;
  updatedAt: string;
};

export type UserTeamDetails = {
  team_name: string;
  money: number;
};
