import userRepository from "../../data/repositories/user.repository";

export const getUserById = async userId => {
    const { id, username, email } = await userRepository.getUserById(userId);
    return { id, username, email };
};
