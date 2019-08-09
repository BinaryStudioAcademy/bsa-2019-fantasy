import userRepository from '../../data/repositories/user.repository';

export const getUserById = async userId => {
    const { id, name, email } = await userRepository.getUserById(userId);
    return { id, name, email };
};
