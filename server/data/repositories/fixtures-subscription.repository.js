import { FixturesSubscriptionModel } from '../models/index';
import BaseRepository from './base.repository';

class FixturesSubscriptionRepository extends BaseRepository {
  addSubscription(subscription) {
    return this.create(subscription);
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
}

export default new FixturesSubscriptionRepository(FixturesSubscriptionModel);
