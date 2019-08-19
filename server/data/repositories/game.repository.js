import { Op } from '../db/connection';
import { GameModel, FootballClubModel } from '../models/index';
import BaseRepository from './base.repository';

class GameRepository extends BaseRepository {
  getById(id) {
    return this.model.findOne({ where: { id } });
  }

  getByGameweekId(id) {
    return this.model.findAll({
      where: { gameweek_id: id },

      include: ['hometeam', 'awayteam'],
    });
  }

  getByClubId(id) {
    return this.model.findAll({
      where: { [Op.or]: [{ hometeam_id: id }, { awayteam_id: id }] },

      include: ['hometeam', 'awayteam'],
    });
  }

  getAllWithClubs() {
    return this.model.findAll({
      include: ['hometeam', 'awayteam'],
    });
  }
}

export default new GameRepository(GameModel);
