import callWebApi from 'helpers/webApiHelper';
import {
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from 'types/forgot.password.types';

export const forgotPassword = async (request: ForgotPasswordCredentials) => {
  const response = await callWebApi({
    endpoint: '/api/forgot',
    type: 'POST',
    request,
  });
  return response.json();
};

export const resetPassword = async (request: ResetPasswordCredentials) => {
  const response = await callWebApi({
    endpoint: `/forgot/${request.id}`,
    type: 'POST',
    request,
  });
  return response.json();
};
