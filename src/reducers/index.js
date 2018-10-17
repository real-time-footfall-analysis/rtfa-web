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
      return _.map(events, event => eventReducer(event, action));
    case "DELETE_REGION_MARKER":
      return _.map(events, event => eventReducer(event, action));
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
      return createUpdatedObject(
        event,
        "markers",
        markerReducer(event.markers, action)
      );
    case "DELETE_REGION_MARKER":
      return createUpdatedObject(
        event,
        "markers",
        markerReducer(event.markers, action)
      );
    default:
      return event;
  }
};

const markerReducer = (markers, action) => {
  if (!markers) {
    return {};
  }
  switch (action.type) {
    case "CREATE_NEW_REGION_MARKER":
      return createUpdatedObject(
        markers,
        action.payload.marker.id,
        action.payload.marker
      );
    case "DELETE_REGION_MARKER":
      return _.filter(markers, marker => marker.id !== action.payload.markerID);
    default:
      return markers;
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
