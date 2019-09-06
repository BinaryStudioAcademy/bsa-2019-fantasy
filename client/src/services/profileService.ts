import callWebApi from 'helpers/webApiHelper';

import { Club } from 'types/club.types';
import { User } from 'types/user.type';
import { GameweekType } from 'types/gameweek.type';
import { TeamMemberData } from 'types/teamMemberHistory.types';

import { UserTeamDetails } from 'types/user.type';
import { FixturesItemType } from 'types/fixtures.types';

export const updateClub = async (clubId: Club['id']) => {
  const response = await callWebApi({
    endpoint: '/api/profile/favorite-club',
    type: 'POST',
    request: { clubId },
  });

  return response.json();
};

export const updateEmailPref = async (
  userId: User['id'],
  sendmail_time: User['sendmail_time'],
  club_email: User['club_email'],
  club_notif: User['club_notif'],
  team_email: User['team_email'],
  team_notif: User['team_notif'],
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/${userId}`,
    type: 'PUT',
    request: { sendmail_time, club_email, club_notif, team_email, team_notif },
  });

  return response.json();
};

//fixture subscribtions
export const getFixtureSub = async (user_id: User['id']) => {
  const response = await callWebApi({
    endpoint: `/api/profile/fixtures-sub/${user_id}`,
    type: 'GET',
  });

  return response.json();
};

export const createFixtureSub = async (
  user_id: User['id'],
  game_id: FixturesItemType['id'],
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/fixtures-sub`,
    type: 'POST',
    request: { user_id, game_id },
  });

  return response.json();
};

export const destroyFixtureSub = async (
  user_id: User['id'],
  game_id: FixturesItemType['id'],
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/fixtures-sub`,
    type: 'DELETE',
    request: { user_id, game_id },
  });

  return response.json();
};

export const updateUserTeamDetails = async (
  userId: User['id'],
  gameweekId: GameweekType['id'],
  userData: UserTeamDetails,
  teamMemberData: TeamMemberData,
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/${userId}/${gameweekId}`,
    type: 'PUT',
    request: { userData, teamMemberData },
  });

  return response.json();
};

export const updateUser = async (
  userId: User['id'],
  image_id: string,
  name: string,
  email: string,
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/update/${userId}`,
    type: 'PUT',
    request: { image_id, name, email },
  });

  return response.json();
};
