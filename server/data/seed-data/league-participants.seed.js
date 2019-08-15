const now = new Date();

export default [
  { is_creator: true },
  { is_creator: false },
  { is_creator: false },
  { is_creator: false },
  { is_creator: false }
].map(participant => ({
  ...participant,
  createdAt: now,
  updatedAt: now
}));
