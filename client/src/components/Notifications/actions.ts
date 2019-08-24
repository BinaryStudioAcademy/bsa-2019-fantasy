import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_READ,
} from './action.types';
import { NotificationType } from 'types/notifications.types';

export const addNotification = (notification: NotificationType) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
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
