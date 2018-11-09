import { matchPath } from "react-router-dom";
import api from "../api";
import { store } from "../store";
import { eventsAreLoaded } from "../selectors";

const isHeatMapPageActive = () => {
  const isActive = matchPath(window.location.pathname, "/heatMap");
  return !!isActive;
};

export const loadHeatMapPageDataIfNeeded = eventID => {
  if (!eventID) {
    eventID = store.getState().selectedEventID;
  }
  if (isHeatMapPageActive()) {
    store.dispatch(loadHeatMap(eventID));
    store.dispatch(loadTasksData(eventID));
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

export const loadTasksData = eventID => {
  const eventsLoaded = eventsAreLoaded(store.getState());
  if (!eventsLoaded) {
    return {
      type: "NOT_READY_TO_LOAD_TASKS"
    };
  }
  return async dispatch => {
    return dispatch({
      type: "LOAD_TASKS_DATA",
      payload: {
        eventID: eventID,
        tasksData: await api.tasks.getDataForAllTasks(eventID)
      }
    });
  };
};
