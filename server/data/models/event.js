export default (orm, DataTypes) => {
    const Event = orm.define(
        'event',
        {
            time_stamp: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            event_type: {
                allowNull: false,
                type: DataTypes.ENUM(
                    'goal',
                    'successful_pass',
                    'shoot',
                    'save',
                    'yellow_card',
                    'red_card'
                )
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {}
    );

    return Event;
};
