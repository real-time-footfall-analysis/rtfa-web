import api from "../api";
import { loadHeatMapPageDataIfNeeded } from "./heatMap";

export const loadEvents = organiserID => {
  return async dispatch => {
    const events = await api.events.getAll(organiserID);
    dispatch({
      type: "LOAD_EVENTS",
      payload: {
        events: events
      }
    });
    loadHeatMapPageDataIfNeeded();
  };
};

export const selectEvent = eventID => {
  loadHeatMapPageDataIfNeeded(eventID);
  return {
    type: "SELECT_NEW_EVENT",
    payload: {
      selectedEventID: eventID
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
