/* eslint-disable no-console */
import fakerApi from './faker.api.helper';
import bulkCreateUpdate from './bulk-create-update.helper';
import playerRepository from '../data/repositories/player.repository';
import playerMatchRepository from '../data/repositories/player-match.repository';
import gameRepository from '../data/repositories/game.repository';
import eventRepository from '../data/repositories/event.repository';

export const updateTableFromFaker = async (repository, tableName, route) => {
  console.log(`Updating ${tableName} from faker`);

  const timestamp = await repository.getLastUpdated();
  console.log(`Last update time is: ${timestamp}`);

  const data = await fakerApi
    .get(`${route}/after`, {
      params: { timestamp },
    })
    .then((res) => res.data)
    .catch((err) => {
      // handle error
      console.log(err);
    });
  console.log(`Loaded ${data.length} rows from faker`);

  const responce = await bulkCreateUpdate(tableName, data);
  console.log(responce);
  return responce;
};

export const updateDbFromFaker = async () => {
  await updateTableFromFaker(playerRepository, 'player_stats', '/playerstats');
  await updateTableFromFaker(gameRepository, 'games', '/games');
  await updateTableFromFaker(
    playerMatchRepository,
    'player_match_stats',
    '/playermatchstats',
  );
  await updateTableFromFaker(eventRepository, 'events', '/events');
};
