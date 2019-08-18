const now = new Date();

export default [
  { is_creator: true, current_rank: 4, last_rank: 4 },
  { is_creator: false, current_rank: 5, last_rank: 4 },
  { is_creator: false, current_rank: 8, last_rank: 4 },
  { is_creator: false, current_rank: 10, last_rank: 4 },
  { is_creator: false, current_rank: 1, last_rank: 4 },
].map((participant) => ({
  ...participant,
  createdAt: now,
  updatedAt: now,
}));
