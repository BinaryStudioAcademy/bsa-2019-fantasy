const now = new Date();

export default [
  {
    name: 'Overall',
    private: false,
  },
  {
    name: 'Arsenal',
    private: false,
  },
  {
    name: 'Aston Villa',
    private: false,
  },
  {
    name: 'Bournemouth',
    private: false,
  },
  {
    name: 'Brighton',
    private: false,
  },
  {
    name: 'Burnley',
    private: false,
  },
  {
    name: 'Chelsea',
    private: false,
  },
  {
    name: 'Crystal Palace',
    private: false,
  },
  {
    name: 'Everton',
    private: false,
  },
  {
    name: 'Leicester',
    private: false,
  },
  {
    name: 'Liverpool',
    private: false,
  },
  {
    name: 'Man City',
    private: false,
  },
  {
    name: 'Man Utd',
    private: false,
  },
  {
    name: 'Newcastle',
    private: false,
  },
  {
    name: 'Norwich',
    private: false,
  },
  {
    name: 'Sheffield Utd',
    private: false,
  },
  {
    name: 'Southampton',
    private: false,
  },
  {
    name: 'Spurs',
    private: false,
  },
  {
    name: 'Watford',
    private: false,
  },
  {
    name: 'West Ham',
    private: false,
  },
  {
    name: 'Wolves',
    private: false,
  },
  {
    name: 'league1',
    private: true,
  },
  {
    name: 'league2',
    private: false,
  },
].map((league) => ({
  ...league,
  createdAt: now,
  updatedAt: now,
}));
