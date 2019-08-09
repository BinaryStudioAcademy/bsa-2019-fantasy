import React from 'react';

import './styles.scss';

const Spinner = () => {
    return (
        <div className='box'>
            <div className='shadow' />
            <div className='gravity'>
                <div className='ball' />
            </div>
        </div>
    );
};

export default Spinner;
