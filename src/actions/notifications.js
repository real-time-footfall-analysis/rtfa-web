import api from "../api";
import { store } from "../store";
import { getSelectedEvent } from "../selectors";
import { ActionTypes } from "./actionTypes";

/* If newNotifications are provided, dispatch an action to store them.
 * Otherwise fetch the initial set of notifications and dispatch an action
 * to store those instead. */
const loadEmergencyNotifications = async newNotifications => {
  const eventID = getSelectedEvent(store.getState()).eventID;
  if (!eventID) {
    console.error(`No selected eventID in loadEmergencyNotifications.`);
    return;
  }
  if (!newNotifications) {
    newNotifications = await api.emergency.getAllNotifications(eventID);
  }
  store.dispatch({
    type: ActionTypes.LOAD_EMERGENCY_NOTIFICATIONS,
    payload: {
      eventID: eventID,
      newNotifications: newNotifications
    }
  });
};

/* This function is syntactic sugar for the initial state fetching functionality
 * of `loadEmergencyNotifications`. */
const loadInitialEmergencyNotifications = () => {
  /* Empty .then() is used here because we're otherwise ignoring the promise
   * returned from loadEmergencyNotifications. */
  loadEmergencyNotifications().then();
};

/* Dispatch an action to add a single new emergency notification to the
 * store. */
export const storeEmergencyNotification = newNotifications => {
  /* Empty .then() is used here because we're otherwise ignoring the promise
   * returned from loadEmergencyNotifications. */
  loadEmergencyNotifications([newNotifications]).then();
};

/* Emergency Notification Setup */
export const setupEmergencyNotifications = () => {
  loadInitialEmergencyNotifications();
  subscribeToFurtherEmergencyNotifications();
};

const subscribeToFurtherEmergencyNotifications = () => {
  const eventID = getSelectedEvent(store.getState()).eventID;
  api.emergency.subscribeToNotifications(
    eventID.toString(),
    storeEmergencyNotification
  );
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
