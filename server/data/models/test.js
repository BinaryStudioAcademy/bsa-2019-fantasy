export default (orm, Sequelize) => {
    const Test = orm.define('Test', {
        value: Sequelize.STRING
    }, {
        freezeTableName: true
    });

    return Test;
};
