import { UserModel, ImageModel } from '../models/index';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getAll() {
    return this.model.findAll();
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getByUsername(name) {
    return this.model.findOne({ where: { name } });
  }

  getUserById(id) {
    return this.model.findOne({
      where: { id },
      include: 'image',
    });
  }

  async updateById(id, data) {
    const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
    return result;
  }
}

export default new UserRepository(UserModel);
