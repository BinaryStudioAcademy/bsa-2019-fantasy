import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/types';
import { NotificationType } from 'types/notifications.types';
import cn from 'classnames';

import {
  removeNotification,
  removeAllNotifications,
  markAllNotificationsRead,
} from './actions';

import { FaBell, FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

/* NOTIFICATION USAGE EXAMPLE */
/* dispatch(addNotification(msg)) */

/* onClickOutside hook */
const useOnClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Notifications = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );

  const [visible, setVisible] = useState(false);

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

  const ref = useRef();
  useOnClickOutside(ref, () => setVisible(false));

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
          <button className='fa-layers fa-fw text-secondary outline-none focus:outline-none relative'>
            <FaBell />
            <FaCircle className={styles.notification} />
          </button>
        ) : (
          <button className='fa-layers fa-fw text-secondary outline-none focus:outline-none'>
            <FaBell />
          </button>
        )}
      </div>
      {visible && (
        <div
          ref={ref as any}
          className={cn(
            styles['notifications-container'],
            'flex flex-col justify-between absolute rounded shadow-figma left-0 p-2 bg-background w-64 h-56',
          )}
        >
          <div className='notifications-list h-48 overflow-y-auto overflow-x-hidden'>
            {notifications.map((notification: NotificationType) => (
              <div
                className='notification flex flex-col border-b pr-2 pl-2'
                key={notification.id}
              >
                <div className='notification-top flex justify-between items-center'>
                  <span className='notification-datetime text-xs text-gray-400'>
                    {notification.time}
                  </span>
                  <button
                    className='notification-close-btn outline-none focus:outline-none hover:text-gray-500'
                    onClick={() => handleRemoveNotification(notification.id)}
                  >
                    x
                  </button>
                </div>
                <div className='notification-text self-start leading-tight'>
                  {notification.msg}
                </div>
              </div>
            ))}
          </div>
          <div className='notifications-control self-center'>
            <button
              className='clear-btn uppercase font-semibold text-center text-gray-400 mt-2 mx-2 hover:text-gray-500 outline-none focus:outline-none'
              onClick={() => handleRemoveAllNotifications()}
            >
              {t('Notifications.navigation.clearAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
