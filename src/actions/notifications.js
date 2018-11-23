import api from "../api";
import { store } from "../store";
import { getSelectedEvent } from "../selectors";
import { ActionTypes } from "./actionTypes";

export const loadInitialEmergencyNotifications = () => {
  const eventID = getSelectedEvent(store.getState()).eventID;
  if (!eventID) {
    return {
      type: "NOT_READY_TO_POLL_EMERGENCY_NOTIFICATIONS"
    };
  }
  store.dispatch(async dispatch =>
    dispatch({
      type: ActionTypes.POLL_EMERGENCY_NOTIFICATIONS,
      payload: {
        eventID: eventID,
        newNotifications: await api.emergency.getNotificationsSince(eventID, 0)
      }
    })
  );
};

export const resolveEmergencyNotification = notification => {
  return async dispatch => {
    // eslint-disable-next-line
    const response = await api.emergency.resolveNotification(notification);
    const actionType = response
      ? ActionTypes.RESOLVE_EMERGENCY_NOTIFICATION
      : "RESOLVING_EMERGENCY_NOTIFICATION_FAILED";
    return dispatch({
      type: actionType,
      payload: {
        eventID: notification.eventId,
        notification: {
          ...notification,
          dealtWith: true
        }
      }
    });
  };
};
