const now = new Date();

export default [{}, {}, {}, {}, {}].map(season => ({
    ...season,
    createdAt: now,
    updatedAt: now
}));
