import { ActionTypes } from "./actionTypes";
import { NotificationsAPI } from "../api/notifications";

export const loadSentNotifications = eventID => {
  return async dispatch => {
    const sentNotifications = await NotificationsAPI.getAll(eventID);
    return dispatch({
      type: ActionTypes.LOAD_SENT_NOTIFICATIONS,
      notifications: sentNotifications
    });
  };
};
