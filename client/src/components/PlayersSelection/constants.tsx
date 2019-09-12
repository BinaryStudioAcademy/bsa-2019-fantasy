import { Position } from 'types/player.types';
const { GKP, DEF, MID, FWD } = Position;

export const sortedBy = [
  { value: 'player_score', label: 'Total points' },
  { value: 'player_price', label: 'Price' },
  { value: 'goals', label: 'Goals' },
  { value: 'assists', label: 'Assists' },
  { value: 'missed_passes', label: 'Interceptions' },
  { value: 'goals_conceded', label: 'Goals conceded' },
  { value: 'saves', label: 'Saves' },
  { value: 'yellow_cards', label: 'Yellow cards' },
  { value: 'red_cards', label: 'Red cards' },
];

export const filteredBy = [
  {
    type: 'group',
    name: 'Global',
    items: [{ value: {}, label: 'All players' }],
  },
  {
    type: 'group',
    name: 'By Position',
    items: [
      { value: { position: GKP }, label: 'Goalkeepers' },
      { value: { position: DEF }, label: 'Defenders' },
      { value: { position: MID }, label: 'Midifilders' },
      { value: { position: FWD }, label: 'Forwards' },
    ],
  },
  {
    type: 'group',
    name: 'By Team',
    items: [
      { value: { club_id: 1 }, label: 'Arsenal' },
      { value: { club_id: 2 }, label: 'Aston Villa' },
      { value: { club_id: 3 }, label: 'Bournemouth' },
      { value: { club_id: 4 }, label: 'Brighton' },
      { value: { club_id: 5 }, label: 'Burnley' },
      { value: { club_id: 6 }, label: 'Chelsea' },
      { value: { club_id: 7 }, label: 'Crystal Palace' },
      { value: { club_id: 8 }, label: 'Everton' },
      { value: { club_id: 9 }, label: 'Leicester' },
      { value: { club_id: 10 }, label: 'Liverpool' },
      { value: { club_id: 11 }, label: 'Man City' },
      { value: { club_id: 12 }, label: 'Man Utd' },
      { value: { club_id: 13 }, label: 'Newcastle' },
      { value: { club_id: 14 }, label: 'Norwich' },
      { value: { club_id: 15 }, label: 'Sheffield Utd' },
      { value: { club_id: 16 }, label: 'Southampton' },
      { value: { club_id: 17 }, label: 'Spurs' },
      { value: { club_id: 18 }, label: 'Watford' },
      { value: { club_id: 19 }, label: 'West Ham' },
      { value: { club_id: 20 }, label: 'Wolves' },
    ],
  },
];

export const maxPrice = [
  { value: '45', label: '45' },
  { value: '50', label: '50' },
  { value: '55', label: '55' },
  { value: '60', label: '60' },
  { value: '65', label: '65' },
  { value: '70', label: '70' },
  { value: '75', label: '75' },
  { value: '80', label: '80' },
  { value: '85', label: '85' },
  { value: '90', label: '90' },
  { value: '95', label: '95' },
  { value: '100', label: '100' },
  { value: '105', label: '105' },
  { value: '110', label: '110' },
  { value: '115', label: '115' },
  { value: '120', label: '120' },
  { value: '125', label: '125' },
];
