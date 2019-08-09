import React from 'react';
import moment from 'moment';

import FixturesItem from './FixturesItem';

const data = [
    { date: '2019-08-09 15:30:11', team1: 'Liverpool', team2: 'LVP' },
    { date: '2019-08-09  19:30:11', team1: 'Juventus', team2: 'NE-Juventus' },
    { date: '2019-08-11 12:30:11', team1: 'Juventus', team2: 'Juventus' },
    { date: '2019-08-11 12:30:11', team1: 'Dinamo', team2: 'NAVI' },
    { date: '2019-09-09 19:30:11', team1: 'Barselona', team2: 'Arsenal' },
];

const Fixtures = ({ matches, gameweek }: any) => {
    const renderMessages = () => {
        let currentDate = '';

        return data.flatMap((match: any) => {
            const res = [<FixturesItem data={match} key={`fixtures-${match.id}`} />];

            const messageDate = moment(match.date).format('dddd D MMMM YYYY');
            if (currentDate !== messageDate) {
                res.unshift(
                    <div
                        className='fixtures-list__daystamp block'
                        key={`daystamp-${messageDate}`}
                    >
                        <span>{messageDate}</span>
                    </div>,
                );
                currentDate = messageDate;
            }

            return res;
        });
    };

    return (
        <div className='bg-white  py-6'>
            <div className='fixtures-list flex flex-col items-stretch text-center max-w-2xl'>
                <h2 className='text-4xl'>Fixtures</h2>
                <p className='my-3'>
                    Gameweek {gameweek} - {moment(data[0].date).format('ddd D MMMM YYYY')}
                </p>
                {renderMessages()}
            </div>
        </div>
    );
};

export default Fixtures;
