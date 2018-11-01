import api from "../api";
import { store } from "../store";
import { getRegion } from "../selectors";

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

export const updateRegionOnServer = (eventID, regionID) => {
  if (regionID === null || regionID === undefined) {
    throw TypeError("No regionID passed into updateRegionOnServer");
  }
  return async dispatch => {
    const updatedRegion = await processRegionUpdate(eventID, regionID);
    return dispatch({
      type: "UPDATE_REGION",
      payload: {
        eventID: eventID,
        regionID: updatedRegion.regionID,
        updatedRegion: updatedRegion
      }
    });
  };
};

const processRegionUpdate = async (eventID, regionID) => {
  const oldRegion = getRegion(store.getState(), regionID),
    formattedRegion = api.events._reformatOutgoingRegion(oldRegion, eventID),
    updatedRegion = await api.events.updateRegion(eventID, formattedRegion);
  return api.events._reformatIncomingRegion({
    ...updatedRegion,
    isBoxOpen: true
  });
};
