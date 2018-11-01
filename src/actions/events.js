import api from "../api";
import { loadHeatMapIfNeeded } from "./heatMap";

export const loadEvents = organiserID => {
  return async dispatch => {
    const events = await api.events.getAll(organiserID);
    dispatch({
      type: "LOAD_EVENTS",
      payload: {
        events: events
      }
    });
    loadHeatMapIfNeeded();
  };
};

export const selectEvent = event => {
  loadHeatMapIfNeeded(event.eventID);
  return {
    type: "SELECT_NEW_EVENT",
    payload: {
      selectedEventID: event.eventID
    }
  };
};

export const createNewEvent = newEvent => {
  return async dispatch =>
    dispatch({
      type: "CREATE_NEW_EVENT",
      payload: {
        event: await api.events.create(newEvent)
      }
    });
};
