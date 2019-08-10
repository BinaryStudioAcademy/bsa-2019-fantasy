import React, { useState } from 'react';

const Notifications = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => setVisible(!visible);

    return (
        <div className='relative'>
            <div
                className='hover:text-white cursor-pointer'
                onClick={toggleVisible}
                role='button'
                tabIndex={-1}
            >
                Ring icon
            </div>
            {visible && (
                <div className='absolute left-0 p-8 bg-background'>Notifications</div>
            )}
        </div>
    );
};

export default Notifications;
