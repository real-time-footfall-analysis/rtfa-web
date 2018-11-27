import api from "../api";
import { ActionTypes } from "./actionTypes";
import { loadHeatMapPageDataIfNeeded } from "./heatMap";
import { setupEmergencyNotifications } from "./notifications";

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
    loadHeatMapPageDataIfNeeded();
    setupEmergencyNotifications();
  };
};

/* Create an action to mark the given eventID as "selected". */
export const selectEvent = eventID => {
  loadHeatMapPageDataIfNeeded(eventID);
  return {
    type: ActionTypes.SELECT_NEW_EVENT,
    payload: {
      selectedEventID: eventID
    }
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
