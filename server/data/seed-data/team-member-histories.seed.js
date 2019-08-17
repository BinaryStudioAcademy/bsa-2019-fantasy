const now = new Date();
const getRandomBoolean = () => Math.random >= 0.5;

export default new Array(200)
  .fill({
    is_on_bench: getRandomBoolean(),
    is_captain: getRandomBoolean(),
  })
  .map((player) => ({
    ...player,
    createdAt: now,
    updatedAt: now,
  }));
