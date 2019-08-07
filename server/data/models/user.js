export default (orm, Sequelize) => {
    const User = orm.define('User', {
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {});

    return User;
};