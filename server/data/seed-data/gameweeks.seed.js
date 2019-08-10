const now = new Date();

export default [
    {
        name: 'name1'
    },
    {
        name: 'name2'
    },
    {
        name: 'name3'
    }
].map(gameweek => ({
    ...gameweek,
    createdAt: now,
    updatedAt: now,
    start: now,
    end: now
}));
