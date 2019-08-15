import userRepository from '../../data/repositories/user.repository';

export const getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  const { password: _, ...userToSend } = user.dataValues;

  return userToSend;
};

export const getUserByEmail = async (userEmail) => {
  const user = await userRepository.getUserByEmail(userEmail);
  const { password: _, ...userToSend } = user.dataValues;

  return userToSend;
};
