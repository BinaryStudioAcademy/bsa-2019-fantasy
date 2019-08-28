export const findBenchPlayer = (players) =>
  players.find(
    (p) => p.is_on_bench && p.player_stats.position !== 'GKP' && !p.player_stats.injury,
  );

export const findBenchPlayerGKP = (players) =>
  players.find(
    (p) => p.is_on_bench && p.player_stats.position === 'GKP' && !p.player_stats.injury,
  );
