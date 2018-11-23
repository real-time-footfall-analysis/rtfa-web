import api from "../api";
import { ActionTypes } from "./actionTypes";
import { loadHeatMapPageDataIfNeeded } from "./heatMap";
import { loadInitialEmergencyNotifications } from "./notifications";

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
    loadInitialEmergencyNotifications();
  };
};

export const selectEvent = eventID => {
  loadHeatMapPageDataIfNeeded(eventID);
  return {
    type: ActionTypes.SELECT_NEW_EVENT,
    payload: {
      selectedEventID: eventID
    }
  };
};

export const createNewEvent = newEvent => {
  return async dispatch =>
    dispatch({
      type: ActionTypes.CREATE_NEW_EVENT,
      payload: {
        event: await api.events.create(newEvent)
      }
    });
};
