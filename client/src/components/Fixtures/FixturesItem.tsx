import React from 'react';
import moment from 'moment';

import './styles.scss';

const FixturesItem = ({ data }: any) => {
    return (
        <li className='flex items-center p-3'>
            <div className='first-team team justify-end'>
                <img
                    className='logo order-1'
                    src='https://i.pinimg.com/originals/59/d6/bb/59d6bb03b62928a02991ee1c706aa318.png'
                    alt='logo'
                />
                <h5 className='font-bold'>{data.team1}</h5>
            </div>
            <div className='time p-3 py-2 rounded mx-2 play-time'>
                <p>{moment(data.date).format('HH:mm')}</p>
            </div>
            <div className='second-team team'>
                <img
                    className='logo'
                    src='http://allday2.com/uploads/posts/2017-09/1504853502_allday_1.jpg'
                    alt='logo'
                />
                <h5 className='font-bold'>{data.team2}</h5>
            </div>
        </li>
    );
};

export default FixturesItem;
