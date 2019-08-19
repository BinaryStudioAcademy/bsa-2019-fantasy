import Sequelize from 'sequelize';
import * as config from '../../config/db.config';

export const { Op } = Sequelize;

export default new Sequelize(config);
