import userRepository from '../../data/repositories/user.repository';

export const getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  const { password: _, ...userToSend } = user.dataValues;

  return userToSend;
};

export const getUserByEmail = async (userEmail) => {
  const user = await userRepository.getByEmail(userEmail);
  const { password: _, ...userToSend } = user.dataValues;

  return userToSend;
};

export const updateById = async (id, data) => {
  try {
    await userRepository.updateById(id, data);
    const user = await userRepository.getById(id);

    const { password: _, ...userToSend } = user.dataValues;

    return userToSend;
  } catch (e) {
    return null;
  }
};
