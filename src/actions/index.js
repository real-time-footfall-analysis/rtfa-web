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

export const createNewRegion = (organiserID, eventID, region) => {
  return async dispatch => {
    /* This could technically handle multiple regions being added
     * simultaneously, but just take the first item for now. */
    const responseRegion = (await api.events.addRegions(eventID, region))[0];
    return dispatch({
      type: "CREATE_NEW_REGION",
      payload: {
        eventID: eventID,
        region: {
          ...responseRegion,
          isBoxOpen: true
        }
      }
    });
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
