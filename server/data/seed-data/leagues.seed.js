const now = new Date();

export default [
    {
        name: 'league1',
        private: true
    },
    {
        name: 'league2',
        private: true
    },
    {
        name: 'league3',
        private: false
    },
    {
        name: 'league4',
        private: false
    },
    {
        name: 'league5',
        private: false
    }
].map(league => ({
    ...league,
    createdAt: now,
    updatedAt: now
}));
