import _ from "lodash";
import { combineReducers } from "redux";

const eventsReducer = (events, action) => {
  if (!events) {
    return {};
  }
  switch (action.type) {
    case "LOAD_EVENTS":
      return action.payload.events;
    case "CREATE_NEW_EVENT":
      return createUpdatedObject(
        events,
        action.payload.event.eventID,
        action.payload.event
      );
    case "CREATE_NEW_REGION":
    case "DELETE_REGION":
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION":
      return _.keyBy(
        _.map(events, event => eventReducer(event, action)),
        "eventID"
      );
    case "LOAD_HEATMAP_DATA":
    case "LOAD_TASKS_DATA": {
      return _.keyBy(
        _.map(events, event => eventReducer(event, action)),
        "eventID"
      );
    }
    default:
      return events;
  }
};

const eventReducer = (event, action) => {
  if (!event) {
    return {};
  } else if (event.eventID !== action.payload.eventID) {
    return event;
  }
  switch (action.type) {
    case "CREATE_NEW_REGION":
    case "DELETE_REGION":
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION":
      return createUpdatedObject(
        event,
        "regions",
        regionsReducer(event.regions, action)
      );
    case "LOAD_HEATMAP_DATA":
      return {
        ...event,
        heatMapData: action.payload.heatMapData
      };
    case "LOAD_TASKS_DATA":
      return {
        ...event,
        tasksData: action.payload.tasksData
      };
    default:
      return event;
  }
};

const regionsReducer = (regions, action) => {
  if (!regions) {
    return {};
  }
  switch (action.type) {
    case "CREATE_NEW_REGION": {
      const existingBoxesHidden = _.map(regions, region =>
        regionReducer(region, action)
      );
      return createUpdatedObject(
        existingBoxesHidden,
        action.payload.region.regionID,
        action.payload.region
      );
    }
    case "DELETE_REGION": {
      return _.filter(
        regions,
        region => region.regionID !== action.payload.regionID
      );
    }
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION": {
      return _.keyBy(
        _.map(regions, region => regionReducer(region, action)),
        "regionID"
      );
    }
    default: {
      return regions;
    }
  }
};

const regionReducer = (region, action) => {
  if (!region) {
    return {};
  }
  const isTargetRegion = region.regionID === action.payload.regionID;
  switch (action.type) {
    case "CREATE_NEW_REGION": {
      return {
        ...region,
        isBoxOpen: isTargetRegion
      };
    }
    case "TOGGLE_REGION_MARKER_BOX": {
      return {
        ...region,
        isBoxOpen: isTargetRegion ? !region.isBoxOpen : false
      };
    }
    case "UPDATE_REGION": {
      if (!isTargetRegion) {
        return region;
      }
      return {
        ...region,
        [action.payload.fieldToUpdate]: action.payload.updatedValue
      };
    }
    default:
      return region;
  }
};

const selectedEventIDReducer = (selectedEventID, action) => {
  if (!selectedEventID) {
    return -1;
  }
  switch (action.type) {
    case "SELECT_NEW_EVENT":
      return action.payload.selectedEventID;
    case "LOAD_EVENTS":
      return _.isEmpty(action.payload.events)
        ? {}
        : _.values(action.payload.events)[0].eventID;
    case "CREATE_NEW_EVENT":
      if (!action.payload.event.eventID) {
        console.error(
          "CREATE_NEW_EVENT failed due to: undefined eventID. See action object below:"
        );
        console.error(action);
      }
      return action.payload.event.eventID;
    default:
      return selectedEventID;
  }
};

const createUpdatedObject = (parentObject, keyToUpdate, updatedValue) => {
  const updatedParent = {
    ...parentObject
  };
  updatedParent[keyToUpdate] = updatedValue;
  return updatedParent;
};

export const rootReducer = combineReducers({
  events: eventsReducer,
  selectedEventID: selectedEventIDReducer,
  /* There's a bug with importing the initialState and using
   * that to set this constant, so the organiserID value needs to
   * be set here, and in the initialStore. */
  organiserID: () => 1
});
