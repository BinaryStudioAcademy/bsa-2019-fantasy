import callWebApi from 'helpers/webApiHelper';
import { ForgotPasswordCredentials } from 'types/forgot.password.types';

export const forgotPassword = async (request: ForgotPasswordCredentials) => {
  const response = await callWebApi({
    endpoint: '/api/forgot',
    type: 'POST',
    request,
  });
  return response.json();
};
