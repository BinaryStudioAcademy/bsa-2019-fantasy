import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import userRepository from '../../data/repositories/user.repository';

export const login = async (user) => ({
  token: tokenHelper.createToken({ id: user.id }),
  user,
});

export const register = async ({ password, ...userData }) => {
  const newUser = await userRepository.addUser({
    ...userData,
    password: await cryptoHelper.encrypt(password),
  });

  const { password: _, ...userToSend } = newUser.dataValues;
  return login(userToSend);
};
