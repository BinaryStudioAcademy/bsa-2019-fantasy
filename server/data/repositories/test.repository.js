import BaseRepository from './base.repository';
import { TestModel } from '../models/index';

class TestRepository extends BaseRepository {
    async replaceTestValue(newValue) {
        const allValues = await this.getAll();
        const firstItem = allValues[0];
        let result;
        if (firstItem) {
            result = await this.updateById(firstItem.id, newValue);
        } else {
            result = await this.create(newValue);
        }
        return result;
    }
}

export default new TestRepository(TestModel);
