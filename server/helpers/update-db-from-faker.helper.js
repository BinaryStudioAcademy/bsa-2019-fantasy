/* eslint-disable no-console */
import fakerApi from './faker.api.helper';
import bulkCreateUpdate from './bulk-create-update.helper';

const updatePlayerStatsFromFaker = async () => {
  console.log('Updating PlayerStats from faker');

  // const timestamp = await eventRepository.getLastUpdated();
  const timestamp = '2019-08-28T12:16:59.239Z';
  console.log(`Last event time is: ${timestamp}`);

  const playerStats = await fakerApi
    .get('/playerstats/after', {
      params: { timestamp },
    })
    .then((res) => res.data)
    .catch((err) => {
      // handle error
      console.log(err);
    });
  console.log(`Loaded ${playerStats.length} playerStats from faker`);

  const responce = await bulkCreateUpdate('player_stats', playerStats);
  // console.log(responce);
  return responce;
};

export const updateDbFromFaker = async () => {
  updatePlayerStatsFromFaker();
};

const updatePlayerMatchStatsFromFaker = async () => {
  console.log('Updating PlayerMatchStats from faker');

  // const timestamp = await eventRepository.getLastUpdated();
  const timestamp = '2019-08-28T12:16:59.239Z';
  console.log(`Last event time is: ${timestamp}`);

  let events;
  try {
    events = await fakerApi
      .get('/events/after', {
        params: { timestamp },
      })
      .then((res) => res.data);
    console.log(`Loaded ${events.length} events from faker`);
  } catch (err) {
    console.log(err);
  }
  // console.log(events);

  const event = {
    id: '8fe066a0-ac32-4fb7-9bf9-64753062fe1f',
    event_type: 'attack',
    time: 5400000,
    createdAt: '2019-08-28T12:16:59.240Z',
    updatedAt: '2019-08-28T12:16:59.240Z',
    game_id: '5c17fdef-f1a3-4c30-8991-b485c83f7b30',
    player_match_stat_id: '390edf7f-4042-420d-9991-e01046aa3ba4',
  };

  EventModel.create(event);
  // .then(() => {
  //   // Notice: There are no arguments here, as of right now you'll have to...
  //   return EventModel.findAll();
  // })
  // .then((items) => {
  //   console.log(items); // ... in order to get the array of user objects
  // });
};

const updateEventsFromFaker = async () => {
  console.log('Updating events from faker');

  // const timestamp = await eventRepository.getLastUpdated();
  const timestamp = '2019-08-28T12:16:59.239Z';
  console.log(`Last event time is: ${timestamp}`);

  let events;
  try {
    events = await fakerApi
      .get('/events/after', {
        params: { timestamp },
      })
      .then((res) => res.data);
    console.log(`Loaded ${events.length} events from faker`);
  } catch (err) {
    console.log(err);
  }
  // console.log(events);

  const event = {
    id: '8fe066a0-ac32-4fb7-9bf9-64753062fe1f',
    event_type: 'attack',
    time: 5400000,
    createdAt: '2019-08-28T12:16:59.240Z',
    updatedAt: '2019-08-28T12:16:59.240Z',
    game_id: '5c17fdef-f1a3-4c30-8991-b485c83f7b30',
    player_match_stat_id: '390edf7f-4042-420d-9991-e01046aa3ba4',
  };

  EventModel.create(event);
  // .then(() => {
  //   // Notice: There are no arguments here, as of right now you'll have to...
  //   return EventModel.findAll();
  // })
  // .then((items) => {
  //   console.log(items); // ... in order to get the array of user objects
  // });
};
