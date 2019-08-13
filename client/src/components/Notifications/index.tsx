import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';

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
        <span className='fa-layers fa-fw text-secondary'>
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon
            icon={faCircle}
            color={'#FF482F'}
            transform='shrink-11 right-5 up-4'
          />
        </span>
      </div>
      {visible && (
        <div className='absolute rounded shadow-figma left-0 p-4 bg-background'>
          Notifications
        </div>
      )}
    </div>
  );
};

export default Notifications;
