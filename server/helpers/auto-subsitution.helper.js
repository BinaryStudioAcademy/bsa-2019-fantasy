import moment from 'moment';

export const findBenchPlayer = (players, now) =>
  players.find(
    (p) =>
      p.is_on_bench &&
      p.player_stats.position !== 'GKP' &&
      !moment(p.player_stats.injury).isAfter(now),
  );

export const findBenchPlayerGKP = (players, now) =>
  players.find(
    (p) =>
      p.is_on_bench &&
      p.player_stats.position === 'GKP' &&
      !moment(p.player_stats.injury).isAfter(now),
  );
