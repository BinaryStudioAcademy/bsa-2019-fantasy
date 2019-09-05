import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import userRepository from '../../data/repositories/user.repository';

export const login = async ({ password: _, ...user }) => {
  return {
    token: tokenHelper.createToken({ id: user.id }),
    user,
  };
};

export const register = async ({ password, ...userData }) => {
  if (!password) throw new Error('No password entered!');

  const newUser = await userRepository.addUser({
    ...userData,
    password: await cryptoHelper.encrypt(password),
  });

  const { password: _, ...userToSend } = newUser.dataValues;
  return login(userToSend);
};
