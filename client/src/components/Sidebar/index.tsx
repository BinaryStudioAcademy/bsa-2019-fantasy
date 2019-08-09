import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpened, setOpened] = useState(false);
    const toggleOpened = () => setOpened(!isOpened);

    const menuItems = ['Status', 'Club', 'Statistics', 'Transfers', 'Leagues'];

    return (
        <div
            className='flex flex-col items-center py-10 bg-secondary text-primary2 h-screen'
            onClick={toggleOpened}
        >
            <div className='item'>Logo</div>
            <div className='mt-32'>Avatar</div>
            <div>User</div>
            <div>Points</div>
            <div className='menu mt-16'>
                {menuItems.map((item) => (
                    <div className='menuItem flex' key={`menu-item-"${item}"`}>
                        <div className='px-4'>icon</div>
                        {isOpened && <div className='ml-4'>{item}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
