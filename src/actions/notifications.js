import { ActionTypes } from "./actionTypes";
import { NotificationsAPI } from "../api/notifications";

/* Fetches all sent notifications and dispatches an action to store them
 * under the event object with the given eventID. */
export const loadSentNotifications = eventID => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.LOAD_SENT_NOTIFICATIONS,
      payload: {
        eventID: eventID,
        sentNotifications: await NotificationsAPI.getAll(eventID)
      }
    });
  };
};
