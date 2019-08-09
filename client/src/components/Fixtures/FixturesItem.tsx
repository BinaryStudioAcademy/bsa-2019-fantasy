import React from 'react';
import moment from 'moment';

import './styles.scss';

const FixturesItem = ({ data }: any) => {
    return (
        <li className='flex items-center p-3 '>
            <div className='first-team team'>
                <img src={data.team1.avatar} alt='logo' />
                <h5 className='font-bold'>{data.team1}</h5>
            </div>
            <div className='time p-3 py-2 rounded border-blue-500 border border-solid mx-2 play-time'>
                <p>{moment(data.date).format('HH:mm')}</p>
            </div>
            <div className='second-team team'>
                <img src={data.team2.avatar} alt='logo' />
                <h5 className='font-bold'>{data.team2}</h5>
            </div>
        </li>
    );
};

export default FixturesItem;
