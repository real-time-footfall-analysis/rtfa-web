import api from "../api";
import { store } from "../store";
import { eventsAreLoaded } from "../selectors";

export const loadHeatMapIfNeeded = eventID => {
  if (!eventID) {
    eventID = store.getState().selectedEventID;
  }
  if (window.location.pathname === "/heatMap") {
    store.dispatch(loadHeatMap(eventID));
  }
};

export const loadHeatMap = eventID => {
  const eventsLoaded = eventsAreLoaded(store.getState());
  if (!eventsLoaded) {
    return {
      type: "NOT_READY_TO_LOAD_HEATMAP"
    };
  }
  return async dispatch =>
    dispatch({
      type: "LOAD_HEATMAP_DATA",
      payload: {
        eventID: eventID,
        heatMapData: await api.heatMap.getHeatMapData(eventID)
      }
    });
};
