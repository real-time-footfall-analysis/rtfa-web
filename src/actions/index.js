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
export const createNewRegion = (eventID, region) => {
  return {
    type: "CREATE_NEW_REGION",
    payload: {
      eventID: eventID,
      region: {
        ...region,
        regionID: _.uniqueId("region_")
      }
    }
  };
};

export const deleteRegion = (eventID, regionID) => {
  return {
    type: "DELETE_REGION",
    payload: {
      eventID: eventID,
      regionID: regionID
    }
  };
};

export const toggleRegionMarkerBox = (eventID, regionID) => {
  if (regionID === null || regionID === undefined) {
    throw TypeError("No regionID passed into toggleRegionMarkerBox");
  }
  return {
    type: "TOGGLE_REGION_MARKER_BOX",
    payload: {
      eventID: eventID,
      regionID: regionID
    }
  };
};

export const updateRegion = (
  eventID,
  regionID,
  fieldToUpdate,
  updatedValue
) => {
  if (regionID === null || regionID === undefined) {
    throw TypeError("No regionID passed into updateRegionName");
  }
  return {
    type: "UPDATE_REGION",
    payload: {
      eventID: eventID,
      regionID: regionID,
      fieldToUpdate: fieldToUpdate,
      updatedValue: updatedValue
    }
  };
};

export const updateRegionName = (eventID, regionID, name) => {
  return updateRegion(eventID, regionID, "name", name);
};

export const updateRegionType = (eventID, regionID, type) => {
  return updateRegion(eventID, regionID, "type", type);
};

export const updateRegionRadius = (eventID, regionID, radius) => {
  return updateRegion(eventID, regionID, "radius", radius);
};
