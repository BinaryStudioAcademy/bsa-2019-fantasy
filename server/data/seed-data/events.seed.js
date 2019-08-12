const now = new Date();

export default [
  {
    event_type: 'goal'
  },
  {
    event_type: 'assist'
  },
  {
    event_type: 'missed_pass'
  },
  {
    event_type: 'goal_conceded'
  },
  {
    event_type: 'save'
  },
  {
    event_type: 'yellow_card'
  },
  {
    event_type: 'red_card'
  }
].map(ev => ({
  ...ev,
  createdAt: now,
  updatedAt: now
}));
