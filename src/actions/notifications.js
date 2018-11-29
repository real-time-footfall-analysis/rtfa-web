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

/* Sends the given notification to the API via a POST request.
 * @returns A dispatchable action that saves the API's version of the
 * notification object into the Redux store. */
export const sendNotification = (eventID, notification) => {
  return async dispatch => {
    const sent = await NotificationsAPI.send(eventID, notification);
    console.log(sent);
    dispatch({
      type: ActionTypes.SEND_NOTIFICATION,
      payload: {
        eventID: eventID,
        notification: sent
      }
    });
  };
};
