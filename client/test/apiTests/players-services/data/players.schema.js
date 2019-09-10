const playersSchema = [  
    'first_name',
    'second_name',
    'player_price',
    'player_score',
    'position',
    'goals',
    'assists',
    'missed_passes',
    'club_id',
    'code',
    'goals_conceded',
    'saves',
    'yellow_cards',
    'red_cards'
];

playerFixtures = [
    'start',
    'opp',
    'round'
];

nextFixtureSchema = [
    'fixture',
    'start',
    'isHome'
];

playerStatsSchema = [
    'gameweek',
    'game',
    'stats'
];

module.exports = {
    playersSchema,
    playerFixtures,
    nextFixtureSchema,
    playerStatsSchema
}