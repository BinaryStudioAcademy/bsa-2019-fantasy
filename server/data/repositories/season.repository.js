import { SeasonModel } from '../models/index';
import BaseRepository from './base.repository';

class SeasonRepository extends BaseRepository {}

export default new SeasonRepository(SeasonModel);
