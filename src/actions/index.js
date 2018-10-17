import _ from "lodash";

export const eventsLoaded = events => {
  return {
    type: "LOAD_EVENTS",
    payload: {
      events: events
    }
  };
};

export const selectEvent = event => {
  return {
    type: "SELECT_NEW_EVENT",
    payload: {
      selectedEventID: event.eventID
    }
  };
};

export const createNewEvent = event => {
  return {
    type: "CREATE_NEW_EVENT",
    payload: {
      event: event
    }
  };
};

export const createNewRegionMarker = marker => {
  return {
    type: "CREATE_NEW_REGION_MARKER",
    payload: {
      marker: {
        ...marker,
        markerID: _.uniqueId("marker_")
      }
    }
  };
};

export const deleteRegionMarker = markerID => {
  return {
    type: "DELETE_REGION_MARKER",
    payload: {
      markerID: markerID
    }
  };
};

export const toggleRegionMarkerBox = markerID => {
  if (markerID === null || markerID === undefined) {
    throw TypeError("No markerID passed into toggleRegionMarkerBox");
  }
  return {
    type: "TOGGLE_REGION_MARKER_BOX",
    payload: {
      markerID: markerID
    }
  };
};
