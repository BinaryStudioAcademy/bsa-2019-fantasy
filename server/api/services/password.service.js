import userRepository from '../../data/repositories/user.repository';
import cryptoHelper from '../../helpers/crypto.helper';

export const updateUserPassword = async (id, password) => {
  const response = await userRepository.updateById(id, {
    password: await cryptoHelper.encrypt(password)
  });
  return response;
};
