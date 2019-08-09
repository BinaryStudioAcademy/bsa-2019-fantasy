export default (orm, DataTypes) => {
    const Event = orm.define(
        'event',
        {
            time_stamp: DataTypes.DATE,
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
