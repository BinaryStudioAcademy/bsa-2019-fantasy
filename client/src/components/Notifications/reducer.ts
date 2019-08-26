import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_READ,
} from './action.types';
import { NotificationType } from 'types/notifications.types';

type State = {
  notifications: NotificationType[];
};

const initialState: State = {
  notifications: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case REMOVE_NOTIFICATION:
      const updatedNotifications = [...state.notifications].filter(
        (notification) => notification.id !== action.payload,
      );
      return { ...state, notifications: updatedNotifications };
    case REMOVE_ALL_NOTIFICATIONS:
      return { ...state, notifications: [] };
    case MARK_ALL_NOTIFICATIONS_READ:
      const preparedNotifications = action.payload;
      preparedNotifications.forEach(
        (part: string, index: string, preparedNotifications: NotificationType[]) => {
          preparedNotifications[index].isRead = true;
        },
      );
      return { ...state, notifications: preparedNotifications };
    default:
      return state;
  }
};
