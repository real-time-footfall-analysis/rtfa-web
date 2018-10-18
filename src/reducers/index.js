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
    case "CREATE_NEW_REGION_MARKER":
    case "DELETE_REGION_MARKER":
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION_NAME":
    case "UPDATE_REGION_TYPE":
    case "UPDATE_REGION_RADIUS":
      return _.keyBy(
        _.map(events, event => eventReducer(event, action)),
        "eventID"
      );
    default:
      return events;
  }
};

const eventReducer = (event, action) => {
  if (!event) {
    return {};
  }
  switch (action.type) {
    case "CREATE_NEW_REGION_MARKER":
    case "DELETE_REGION_MARKER":
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION_NAME":
    case "UPDATE_REGION_TYPE":
    case "UPDATE_REGION_RADIUS":
      return createUpdatedObject(
        event,
        "markers",
        markersReducer(event.markers, action)
      );
    default:
      return event;
  }
};

const markersReducer = (markers, action) => {
  if (!markers) {
    return {};
  }
  switch (action.type) {
    case "CREATE_NEW_REGION_MARKER": {
      const hideExistingBoxMarkers = _.map(markers, marker =>
        markerReducer(marker, action)
      );
      return createUpdatedObject(
        hideExistingBoxMarkers,
        action.payload.marker.markerID,
        action.payload.marker
      );
    }
    case "DELETE_REGION_MARKER": {
      return _.filter(markers, marker => marker.id !== action.payload.markerID);
    }
    case "TOGGLE_REGION_MARKER_BOX":
    case "UPDATE_REGION_NAME":
    case "UPDATE_REGION_TYPE":
    case "UPDATE_REGION_RADIUS": {
      return _.keyBy(
        _.map(markers, marker => markerReducer(marker, action)),
        "markerID"
      );
    }
    default: {
      return markers;
    }
  }
};

const markerReducer = (marker, action) => {
  if (!marker) {
    return {};
  }
  const isTargetMarker = marker.markerID === action.payload.markerID;
  switch (action.type) {
    case "CREATE_NEW_REGION_MARKER": {
      return {
        ...marker,
        isBoxOpen: isTargetMarker
      };
    }
    case "TOGGLE_REGION_MARKER_BOX": {
      return {
        ...marker,
        isBoxOpen: isTargetMarker ? !marker.isBoxOpen : false
      };
    }
    case "UPDATE_REGION_NAME": {
      if (!isTargetMarker) {
        return marker;
      }
      return {
        ...marker,
        name: action.payload.name
      };
    }
    case "UPDATE_REGION_TYPE": {
      if (!isTargetMarker) {
        return marker;
      }
      return {
        ...marker,
        type: action.payload.type
      };
    }
    case "UPDATE_REGION_RADIUS": {
      if (!isTargetMarker) {
        return marker;
      }
      return {
        ...marker,
        radius: action.payload.radius
      };
    }
    default:
      return marker;
  }
};

const selectedEventIDReducer = (selectedEventID, action) => {
  if (!selectedEventID) {
    return "No Events Loaded";
  }
  switch (action.type) {
    case "SELECT_NEW_EVENT":
      return action.payload.selectedEventID;
    case "LOAD_EVENTS":
      return _.isEmpty(action.payload.events)
        ? {}
        : _.values(action.payload.events)[0].eventID;
    case "CREATE_NEW_EVENT":
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
  selectedEventID: selectedEventIDReducer
});
