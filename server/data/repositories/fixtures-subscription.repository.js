import { FixturesSubscriptionModel } from '../models/index';
import BaseRepository from './base.repository';

class FixturesSubscriptionRepository extends BaseRepository {
  addSubscription(subscription) {
    return this.create(subscription);
  }

  getByUserAndGameId(user_id, game_id) {
    return this.model.findOne({ where: { user_id, game_id } });
  }

  getAll() {
    return this.model.findAll();
  }

  async updateById(id, data) {
    const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
    return result;
  }

  deleteByUserAndGameId(user_id, game_id) {
    return this.model.destroy({ where: { user_id, game_id } });
  }
}

export default new FixturesSubscriptionRepository(FixturesSubscriptionModel);
