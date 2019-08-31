import * as teamMemberHistoryService from './team-member-history.service';
import { DEFAULT_TRANSFER_COST } from '../../helpers/constants.helper';

import gameweekHistoryRepository from '../../data/repositories/gameweek-history.repository';
import userRepository from '../../data/repositories/user.repository';
import playerRepository from '../../data/repositories/player.repository';

/**
 * @param {string} user_id
 * @param {string} gameweek_id
 * @param { { in_player: string, out_player: string }[] } transfers
 */
export const applyTransfers = async (user_id, gameweek_id, transfers) => {
  try {
    const transfer_amount = transfers.length;
    const successTransfers = [];

    const user = { ...(await userRepository.getById(user_id)).dataValues };

    const { id: history_id } = await gameweekHistoryRepository.getByUserGameweekId(
      user_id,
      gameweek_id,
    );

    const teamMemberHistory = (await teamMemberHistoryService.getPlayersByGameweekId(
      history_id,
    )).map(({ dataValues: { player_stats, ...m } }) => m);

    const inPlayers = await Promise.all(
      transfers.map(
        async (t) => (await playerRepository.getById(t.in_player)).dataValues,
      ),
    );

    const newTeamMembers = teamMemberHistory.map((m) => {
      const newPlayer = { ...m };

      transfers.forEach(({ out_player, in_player }, idx) => {
        if (m.player_id === out_player) {
          const in_player_from_db = inPlayers[idx];

          if (user.free_transfers > 0) {
            user.free_transfers -= 1;
          } else if (user.score >= DEFAULT_TRANSFER_COST) {
            user.score -= DEFAULT_TRANSFER_COST;
          } else {
            throw new Error('Not enough score points to make transfers!');
          }

          if (user.money >= in_player_from_db.player_price) {
            user.money -= in_player_from_db.player_price;
          } else {
            throw new Error('Not enough money to make transfers!');
          }

          successTransfers.push({ out_player, in_player });
          newPlayer.player_id = in_player;
        }
      });
      return newPlayer;
    });
    await userRepository.updateById(user.id, user);
    await teamMemberHistoryService.postTeamMemberHistory(newTeamMembers, history_id);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < successTransfers.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const nTransfersIn = await playerRepository
        .getById(successTransfers[i].in_player)
        .then((player) => player.dataValues.transfers_in);
      // eslint-disable-next-line no-await-in-loop
      await playerRepository.updateById(successTransfers[i].in_player, {
        transfers_in: nTransfersIn + 1,
      });
      // eslint-disable-next-line no-await-in-loop
      const nTransfersOut = await playerRepository
        .getById(successTransfers[i].out_player)
        .then((player) => player.dataValues.transfers_out);
      // eslint-disable-next-line no-await-in-loop
      await playerRepository.updateById(successTransfers[i].out_player, {
        transfers_out: nTransfersOut + 1,
      });
    }

    return transfer_amount;
  } catch (err) {
    throw err;
  }
};
