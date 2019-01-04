import api from "../api";
import { ActionTypes } from "./actionTypes";
import { setupEmergencyNotifications } from "./emergencyNotifications";
import { getSelectedEvent } from "../selectors";
import { store } from "../store";

/* Load all event objects for the given organiserID and trigger additional
 * requests for heatMap data and emergency notifications. */
export const loadEvents = organiserID => {
  return async dispatch => {
    const events = await api.events.getAll(organiserID);
    dispatch({
      type: ActionTypes.LOAD_EVENTS,
      payload: {
        events: events
      }
    });
    setupEmergencyNotifications();
  };
};

/* Create an action to mark the given eventID as "selected". */
export const selectEvent = eventID => {
  if (eventID === getSelectedEvent(store.getState()).eventID) {
    return { type: "RESELECTED_SAME_EVENT", payload: {} };
  }
  window.centreSet = false;
  return dispatch => {
    dispatch({
      type: ActionTypes.SELECT_NEW_EVENT,
      payload: {
        selectedEventID: eventID
      }
    });
    setupEmergencyNotifications();
  };
};

/* Submit newEvent to the API and then update the store with the
 * fully-formed event object (with unique eventID) that the API returns. */
export const createNewEvent = newEvent => {
  return async dispatch =>
    dispatch({
      type: ActionTypes.CREATE_NEW_EVENT,
      payload: {
        event: await api.events.create(newEvent)
      }
    });
};
