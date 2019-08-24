import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_READ,
} from './action.types';
import { NotificationType } from 'types/notifications.types';

import uuidv4 from 'uuidv4';
import moment from 'moment';

const prepareNotificationObj = (msg: string): NotificationType => {
  return {
    id: uuidv4(),
    msg,
    isRead: false,
    time: moment()
      .format('HH:mm')
      .toString(),
  };
};

export const addNotification = (msg: string) => ({
  type: ADD_NOTIFICATION,
  payload: prepareNotificationObj(msg),
});

export const removeNotification = (notificationId: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: notificationId,
});

export const removeAllNotifications = () => ({
  type: REMOVE_ALL_NOTIFICATIONS,
});

export const markAllNotificationsRead = (notifications: NotificationType[]) => ({
  type: MARK_ALL_NOTIFICATIONS_READ,
  payload: notifications,
});
