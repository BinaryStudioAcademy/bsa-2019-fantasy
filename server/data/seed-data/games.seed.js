const now = new Date();

export default [
    {
        hometeam_score: 23,
        awayteam_score: 12
    },
    {
        hometeam_score: 21,
        awayteam_score: 20
    },
    {
        hometeam_score: 13,
        awayteam_score: 19
    }
].map(game => ({
    ...game,
    start: now,
    end: now,
    createdAt: now,
    updatedAt: now
}));
