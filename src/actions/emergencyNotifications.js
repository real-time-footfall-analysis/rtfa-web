import api from "../api";
import { store } from "../store";
import { getSelectedEvent } from "../selectors";
import { ActionTypes } from "./actionTypes";

/* Emergency Notification Setup */
export const setupEmergencyNotifications = () => {
  const { eventID, emergencyNotifications } = getSelectedEvent(
    store.getState()
  );
  /* Only fetch initial notification set if it doesn't already exist. */
  if (!emergencyNotifications) {
    /* Empty .then(): we don't care about the empty promise returned here. */
    loadInitialEmergencyNotifications(eventID).then();
  }
  subscribeToFurtherEmergencyNotifications();
};

/* Fetch the initial set of notifications for `eventID` and call
 * storeEmergencyNotifications to add them to the Redux store. */
const loadInitialEmergencyNotifications = async eventID => {
  if (!eventID) {
    console.error(`No selected eventID in loadInitialEmergencyNotifications.`);
    return;
  }
  let initialNotifications = await api.emergency.getAllNotifications(eventID);
  storeEmergencyNotifications(eventID, initialNotifications);
};

/* Subscribe to incoming emergency push notifications for the current
 * eventID. */
const subscribeToFurtherEmergencyNotifications = () => {
  const eventID = getSelectedEvent(store.getState()).eventID;
  api.emergency.subscribeToNotifications(
    eventID.toString(),
    storeEmergencyNotification
  );
};

/* Dispatch an action to add a single new emergency notification to the
 * store, under the given eventID. */
export const storeEmergencyNotification = (eventID, newNotification) => {
  storeEmergencyNotifications(eventID, [newNotification]);
};

/* Dispatch an action to add an array of new emergency notifications to the
 * store, under the given eventID. */
const storeEmergencyNotifications = (eventID, newNotifications) => {
  store.dispatch({
    type: ActionTypes.LOAD_EMERGENCY_NOTIFICATIONS,
    payload: {
      eventID: eventID,
      newNotifications: newNotifications
    }
  });
};

/* Submit a request to resolve a specific notification to the API and
 * if the request succeeds, dispatch an action to mark the notification as
 * resolved in the store. */
export const resolveEmergencyNotification = notification => async dispatch => {
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
