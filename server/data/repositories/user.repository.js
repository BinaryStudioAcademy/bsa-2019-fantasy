import { UserModel } from '../models/index';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getByUsername(name) {
    return this.model.findOne({ where: { name } });
  }

  getUserById(id) {
    return this.model.findOne({
      group: ['user.id'],
      where: { id },
    });
  }
}

export default new UserRepository(UserModel);
