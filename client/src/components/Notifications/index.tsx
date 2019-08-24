import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Notification 1', isRead: false },
    { id: 2, text: 'Notification 2', isRead: false },
    { id: 3, text: 'Notification 3', isRead: false },
    { id: 4, text: 'Notification 4', isRead: true },
    { id: 5, text: 'Notification 5', isRead: true },
    { id: 6, text: 'Notification 6', isRead: true },
  ]);

  const removeSingleNotification = (removedObjectId: number) => {
    const modifiedNotifications = notifications.filter(
      (notification) => notification.id !== removedObjectId,
    );

    setNotifications([...modifiedNotifications]);
  };

  const removeAllNotifications = () => {
    setNotifications([]);
  };

  const markAllRead = () => {
    notifications.forEach(function(part, index, notifications) {
      notifications[index].isRead = true;
    });

    setNotifications([...notifications]);
  };

  const toggleVisible = () => {
    markAllRead();
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
        {notifications.find((notification) => notification.isRead === false) ? (
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
            {notifications.map((notification) => (
              <div
                className='notification flex flex-col border-b pr-2 pl-2'
                key={notification.id}
              >
                <button
                  className='notification-close-btn self-end outline-none focus:outline-none'
                  onClick={() => removeSingleNotification(notification.id)}
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
              onClick={removeAllNotifications}
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
