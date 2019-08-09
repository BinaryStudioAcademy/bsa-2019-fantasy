import { GameweekModel } from '../models/index';
import BaseRepository from './base.repository';

class GameweekRepository extends BaseRepository {}

export default new GameweekRepository(GameweekModel);
