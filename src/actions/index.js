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

/* Region Actions */

// TODO: Refactor these to use a "generateRegionAction" function
export const createNewRegionMarker = (eventID, marker) => {
  return {
    type: "CREATE_NEW_REGION_MARKER",
    payload: {
      eventID: eventID,
      marker: {
        ...marker,
        markerID: _.uniqueId("marker_")
      }
    }
  };
};

export const deleteRegionMarker = (eventID, markerID) => {
  return {
    type: "DELETE_REGION_MARKER",
    payload: {
      eventID: eventID,
      markerID: markerID
    }
  };
};

export const toggleRegionMarkerBox = (eventID, markerID) => {
  if (markerID === null || markerID === undefined) {
    throw TypeError("No markerID passed into toggleRegionMarkerBox");
  }
  return {
    type: "TOGGLE_REGION_MARKER_BOX",
    payload: {
      eventID: eventID,
      markerID: markerID
    }
  };
};

export const updateRegionName = (eventID, markerID, name) => {
  if (markerID === null || markerID === undefined) {
    throw TypeError("No markerID passed into updateRegionName");
  }
  return {
    type: "UPDATE_REGION_NAME",
    payload: {
      eventID: eventID,
      markerID: markerID,
      name: name
    }
  };
};

export const updateRegionType = (eventID, markerID, type) => {
  if (markerID === null || markerID === undefined) {
    throw TypeError("No markerID passed into updateRegionType");
  }
  return {
    type: "UPDATE_REGION_TYPE",
    payload: {
      eventID: eventID,
      markerID: markerID,
      type: type
    }
  };
};

export const updateRegionRadius = (eventID, markerID, radius) => {
  if (markerID === null || markerID === undefined) {
    throw TypeError("No markerID passed into updateRegionRadius");
  }
  return {
    type: "UPDATE_REGION_RADIUS",
    payload: {
      eventID: eventID,
      markerID: markerID,
      radius: radius
    }
  };
};
