import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/types';
import { NotificationType } from 'types/notifications.types';

import {
  addNotification,
  removeNotification,
  removeAllNotifications,
  markAllNotificationsRead,
} from './actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';

import uuidv4 from 'uuidv4';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );

  const [visible, setVisible] = useState(false);

  const handleAddNotification = (text: string) => {
    dispatch(addNotification({ id: uuidv4(), text, isRead: false }));
  };

  const handleRemoveNotification = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  const handleRemoveAllNotifications = () => {
    dispatch(removeAllNotifications());
  };

  const toggleVisible = () => {
    dispatch(markAllNotificationsRead(notifications));
    setVisible(!visible);
  };

  return (
    <div className='relative'>
      <div
        className='hover:text-white cursor-pointer'
        onClick={toggleVisible}
        role='button'
        tabIndex={-1}
      >
        {notifications.find(
          (notification: NotificationType) => notification.isRead === false,
        ) ? (
          <button className='fa-layers fa-fw text-secondary outline-none focus:outline-none'>
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon
              icon={faCircle}
              color={'#FF482F'}
              transform='shrink-10 right-5 up-4'
            />
          </button>
        ) : (
          <button className='fa-layers fa-fw text-secondary outline-none focus:outline-none'>
            <FontAwesomeIcon icon={faBell} />
          </button>
        )}
      </div>
      {visible && (
        <div className='notifications-wrapper flex flex-col justify-between absolute rounded shadow-figma left-0 p-2 bg-background w-64 h-56'>
          <div className='notifications-list h-48 overflow-y-auto overflow-x-hidden'>
            {notifications.map((notification: NotificationType) => (
              <div
                className='notification flex flex-col border-b pr-2 pl-2'
                key={notification.id}
              >
                <button
                  className='notification-close-btn self-end outline-none focus:outline-none'
                  onClick={() => handleRemoveNotification(notification.id)}
                >
                  x
                </button>
                <div className='notification-text self-start'>{notification.text}</div>
              </div>
            ))}
          </div>
          <div className='notifications-control self-center'>
            <button
              className='clear-btn uppercase font-semibold text-center text-gray-400 mt-2'
              onClick={() => handleRemoveAllNotifications()}
            >
              Clear all
            </button>
            <button // temporary button
              className='clear-btn uppercase font-semibold text-center text-gray-400 mt-2 ml-2'
              onClick={() => handleAddNotification('Hello world ' + Date.now())}
            >
              Add One
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
