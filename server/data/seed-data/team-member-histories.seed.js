const now = new Date();
const getRandomBoolean = () => Math.random >= 0.5;

const arr = [
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: true,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: true,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: true,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
  {
    is_on_bench: false,
    is_captain: false,
    is_vice_captain: false,
  },
];

export default arr.map((player) => ({
  ...player,
  createdAt: now,
  updatedAt: now,
}));
