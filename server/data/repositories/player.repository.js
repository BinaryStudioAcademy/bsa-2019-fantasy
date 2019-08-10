import { PlayerStatModel } from '../models/index';
import BaseRepository from './base.repository';

class PlayerRepository extends BaseRepository {}

export default new PlayerRepository(PlayerStatModel);
