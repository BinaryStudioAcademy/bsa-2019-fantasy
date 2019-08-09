const now = new Date();

export default [
    {
        event_type: 'goal'
    },
    {
        event_type: 'successful_pass'
    },
    {
        event_type: 'shoot'
    },
    {
        event_type: 'save'
    },
    {
        event_type: 'yellow_card'
    },
    {
        event_type: 'red_card'
    }
].map(ev => ({
    ...ev,
    time_stamp: now,
    createdAt: now,
    updatedAt: now
}));
