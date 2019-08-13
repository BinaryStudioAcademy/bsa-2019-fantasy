const now = new Date();

export default [{ name: '2019-2020' }].map(season => ({
  ...season,
  createdAt: now,
  updatedAt: now
}));
