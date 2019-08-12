const now = new Date();

export default [
  {
    is_on_bench: true,
    is_captain: false
  },
  {
    is_on_bench: true,
    is_captain: false
  },
  {
    is_on_bench: true,
    is_captain: false
  },
  {
    is_on_bench: true,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: true
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  },
  {
    is_on_bench: false,
    is_captain: false
  }
].map(player => ({
  ...player,
  createdAt: now,
  updatedAt: now
}));
