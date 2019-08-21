import callWebApi from 'helpers/webApiHelper';

import { Club } from 'types/club.types';
import { UpdateUserTeamDetails } from 'types/user.type';

export const updateClub = async (clubId: Club['id']) => {
  const response = await callWebApi({
    endpoint: '/api/profile/favorite-club',
    type: 'POST',
    request: { clubId },
  });

  return response.json();
};

export const updateUserTeamDetails = async (
  id: string,
  request: UpdateUserTeamDetails,
) => {
  const response = await callWebApi({
    endpoint: `/api/profile/${id}`,
    type: 'PUT',
    request,
  });

  return response.json();
};
