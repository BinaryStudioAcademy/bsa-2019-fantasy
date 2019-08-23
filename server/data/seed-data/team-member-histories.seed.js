const now = new Date();
const getRandomBoolean = () => Math.random >= 0.5;

const arr = [
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: true,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
  },

  {
    is_on_bench: false,
    is_captain: true,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
  },
];

// export default new Array(30)
//   .fill({
//     is_on_bench: getRandomBoolean(),
//     is_captain: getRandomBoolean(),
//   })
export default arr.map((player) => ({
  ...player,
  createdAt: now,
  updatedAt: now,
}));
