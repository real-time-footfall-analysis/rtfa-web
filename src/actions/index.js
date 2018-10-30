import _ from "lodash";
import api from "../api";

export const loadEvents = organiserID => {
  return async dispatch =>
    dispatch({
      type: "LOAD_EVENTS",
      payload: {
        events: await api.events.getAll(organiserID)
      }
    });
};

export const selectEvent = event => {
  return {
    type: "SELECT_NEW_EVENT",
    payload: {
      selectedEventID: event.eventID
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
