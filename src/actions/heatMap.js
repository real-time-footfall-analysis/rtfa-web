import { matchPath } from "react-router-dom";
import _ from "lodash";
import api from "../api";
import { store } from "../store";
import { eventsAreLoaded } from "../selectors";
import { ActionTypes } from "./actionTypes";

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
      type: ActionTypes.LOAD_HEATMAP_DATA,
      payload: {
        eventID: eventID,
        heatMapData: await api.heatMap.getHeatMapData(eventID)
      }
    });
};

export const loadHistoricalHeatMap = eventID => {
  const eventsLoaded = eventsAreLoaded(store.getState());
  if (!eventsLoaded) {
    return {
      type: "NOT_READY_TO_LOAD_HISTORICAL_HEATMAP"
    };
  }
  return async dispatch =>
    dispatch({
      type: ActionTypes.LOAD_HISTORICAL_HEATMAP_DATA,
      payload: {
        eventID: eventID,
        historicalHeatMapData: await api.heatMap.getHistoricalHeatMapData(
          eventID
        )
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
    const tasks = await api.tasks.getDataForAllTasks(eventID);
    return dispatch({
      type: ActionTypes.LOAD_TASKS_DATA,
      payload: {
        eventID: eventID,
        tasksData: tasks.filter(_.identity)
      }
    });
  };
};

export const setHeatMapSliderValue = (eventID, sliderValue) => {
  return {
    type: ActionTypes.SET_HEATMAP_SLIDER_VALUE,
    payload: {
      eventID: eventID,
      sliderValue: sliderValue
    }
  };
};

/* Handle all data fetching/setup for enabling historical heat maps if
 * `historicalModeEnabled` is true. Otherwise, marks historical mode as
 * disabled. */
export const toggleHeatMapHistoricalMode = (eventID, historicalModeEnabled) => {
  if (historicalModeEnabled) {
    fetchAndSetHistoricalHeatMapData(eventID).then();
  } else {
    setHeatMapHistoricalMode(eventID, false);
  }
};

/* Marks historical mode as enabled, loads historical heat map data
 * and then sets the displayed heat map to use the data from the
 * first historical timestamp. */
const fetchAndSetHistoricalHeatMapData = async eventID => {
  setHeatMapHistoricalMode(eventID, true);
  await store.dispatch(loadHistoricalHeatMap(eventID));
  initialiseHistoricalHeatMap(eventID);
};

/* Dispatches an action to set historical mode to `historicalModeEnabled`
 * for the given eventID. */
const setHeatMapHistoricalMode = (eventID, historicalModeEnabled) => {
  store.dispatch({
    type: ActionTypes.TOGGLE_HEATMAP_HISTORICAL_MODE,
    payload: {
      eventID: eventID,
      historicalModeEnabled: historicalModeEnabled
    }
  });
};

/* Dispatches an action to set the currently displayed heatMapData for the
 * given eventID to be equal to the data for the first timestamp in the event's
 * historical heat map dataset. */
const initialiseHistoricalHeatMap = eventID => {
  store.dispatch({
    type: ActionTypes.INITIALISE_HISTORICAL_HEATMAP,
    payload: {
      eventID: eventID
    }
  });
};
