import callWebApi from 'helpers/webApiHelper';

import { Club } from 'types/club.types';
import { User } from 'types/user.type';
import { GameweekType } from 'types/gameweek.type';
import { TeamMemberData } from 'types/teamMemberHistory.types';

import { UserTeamDetails } from 'types/user.type';

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
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/${userId}`,
    type: 'PUT',
    request: { sendmail_time },
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

export const updateUserAvatar = async (userId: User['id'], image: string) => {
  const response = await callWebApi({
    endpoint: `/api/profile/avatar/${userId}`,
    type: 'PUT',
    request: { image },
  });

  return response.json();
};
