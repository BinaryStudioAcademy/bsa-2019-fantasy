import React from 'react';
import moment from 'moment';

import './styles.scss';

type Props = {
    data: {
        date: string;
        team1: {
            name: string;
            avatar: string;
        };
        team2: {
            name: string;
            avatar: string;
        };
    };
};

const FixturesItem = ({ data }: Props) => {
    return (
        <li className='flex items-center p-3'>
            <div className='first-team team justify-end'>
                <img className='logo order-1' src={data.team1.avatar} alt='logo' />
                <h5 className='font-bold'>{data.team1.name}</h5>
            </div>
            <div className='time p-3 py-2 rounded mx-2 play-time'>
                <p>{moment(data.date).format('HH:mm')}</p>
            </div>
            <div className='second-team team'>
                <img className='logo' src={data.team2.avatar} alt='logo' />
                <h5 className='font-bold'>{data.team2.name}</h5>
            </div>
        </li>
    );
};

export default FixturesItem;
