import { testSeed } from '../seed-data/test.seed';

export default {
    up: async (queryInterface, Sequelize) => {
        try {
            return queryInterface.bulkInsert('Test', testSeed, {});
        } catch (err) {
            console.log(`Seeding error: ${err}`);
        }
    },

    down: (queryInterface, Sequelize) => {
        // =/
    }
};