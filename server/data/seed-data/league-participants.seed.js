const now = new Date();

export default [{}, {}, {}, {}, {}].map(participant => ({
    ...participant,
    createdAt: now,
    updatedAt: now
}));
