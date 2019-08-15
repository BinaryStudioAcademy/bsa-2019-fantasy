import callWebApi from 'helpers/webApiHelper';

import { Club } from 'types/club.types';

export const updateClub = async (clubId: Club['id']) => {
  const response = await callWebApi({
    endpoint: '/api/profile/favorite-club',
    type: 'POST',
    request: { clubId },
  });

  return response.json();
};
