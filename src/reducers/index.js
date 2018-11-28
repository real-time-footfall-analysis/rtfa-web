import _ from "lodash";
import { combineReducers } from "redux";
import { ActionTypes } from "../actions/actionTypes";

const eventsReducer = (events, action) => {
  if (!events) {
    return {};
  }
  switch (action.type) {
    case ActionTypes.LOAD_EVENTS:
      return action.payload.events;
    case ActionTypes.CREATE_NEW_EVENT:
      return createUpdatedObject(
        events,
        action.payload.event.eventID,
        action.payload.event
      );
    case ActionTypes.CREATE_NEW_REGION:
    case ActionTypes.DELETE_REGION:
    case ActionTypes.TOGGLE_REGION_MARKER_BOX:
    case ActionTypes.UPDATE_REGION:
    case ActionTypes.LOAD_HEATMAP_DATA:
    case ActionTypes.LOAD_HISTORICAL_HEATMAP_DATA:
    case ActionTypes.LOAD_TASKS_DATA:
    case ActionTypes.SET_HEATMAP_SLIDER_VALUE:
    case ActionTypes.TOGGLE_HEATMAP_HISTORICAL_MODE:
    case ActionTypes.LOAD_SENT_NOTIFICATIONS:
    case ActionTypes.LOAD_EMERGENCY_NOTIFICATIONS:
    case ActionTypes.RESOLVE_EMERGENCY_NOTIFICATION: {
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
    case ActionTypes.CREATE_NEW_REGION:
    case ActionTypes.DELETE_REGION:
    case ActionTypes.TOGGLE_REGION_MARKER_BOX:
    case ActionTypes.UPDATE_REGION:
      return createUpdatedObject(
        event,
        "regions",
        regionsReducer(event.regions, action)
      );
    /* TODO: Refactor these into a generic reducer. */
    case ActionTypes.LOAD_HEATMAP_DATA:
      return {
        ...event,
        heatMapData: action.payload.heatMapData
      };
    case ActionTypes.LOAD_HISTORICAL_HEATMAP_DATA:
      return {
        ...event,
        historicalHeatMapData: action.payload.historicalHeatMapData
      };
    case ActionTypes.LOAD_TASKS_DATA:
      return {
        ...event,
        tasksData: action.payload.tasksData
      };
    case ActionTypes.SET_HEATMAP_SLIDER_VALUE: {
      const index = action.payload.sliderValue;
      const selectedTimestamp =
        event.historicalHeatMapData.result.timestamps[index];
      const selectedHeatMapData =
        event.historicalHeatMapData.result.data[selectedTimestamp];
      return {
        ...event,
        heatMapData: selectedHeatMapData,
        heatMapSliderValue: action.payload.sliderValue
      };
    }
    case ActionTypes.LOAD_SENT_NOTIFICATIONS: {
      return {
        ...event,
        sentNotifications: action.payload.sentNotifications
      };
    }
    case ActionTypes.LOAD_EMERGENCY_NOTIFICATIONS: {
      const existingNotifications = event.emergencyNotifications
        ? event.emergencyNotifications
        : [];
      return {
        ...event,
        emergencyNotifications: [
          ...action.payload.newNotifications,
          ...existingNotifications
        ]
      };
    }
    case ActionTypes.RESOLVE_EMERGENCY_NOTIFICATION: {
      const updatedNotificationList = resolveNotification(
        action.payload.notification,
        event
      );
      return {
        ...event,
        emergencyNotifications: updatedNotificationList
      };
    }
    case ActionTypes.TOGGLE_HEATMAP_HISTORICAL_MODE:
      return {
        ...event,
        historicalModeEnabled: action.payload.historicalModeEnabled
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
    case ActionTypes.CREATE_NEW_REGION: {
      const existingBoxesHidden = _.keyBy(
        _.map(regions, region => regionReducer(region, action)),
        "regionID"
      );
      return createUpdatedObject(
        existingBoxesHidden,
        action.payload.region.regionID,
        action.payload.region
      );
    }
    case ActionTypes.DELETE_REGION: {
      return _.filter(
        regions,
        region => region.regionID !== action.payload.regionID
      );
    }
    case ActionTypes.TOGGLE_REGION_MARKER_BOX:
    case ActionTypes.UPDATE_REGION: {
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

const resolveNotification = (targetNotification, event) => {
  const updatedNotificationList = event.emergencyNotifications.filter(
    notification =>
      !(
        notification.uuid === targetNotification.uuid &&
        notification.occurredAt === targetNotification.occurredAt
      )
  );
  const insertionIndex = _.sortedIndexBy(
    updatedNotificationList,
    targetNotification,
    notification => -notification.occurredAt
  );
  updatedNotificationList.splice(insertionIndex, 0, targetNotification);
  return updatedNotificationList;
};

const regionReducer = (region, action) => {
  if (!region) {
    return {};
  }
  const isTargetRegion = region.regionID === action.payload.regionID;
  switch (action.type) {
    case ActionTypes.CREATE_NEW_REGION: {
      return {
        ...region,
        isBoxOpen: isTargetRegion
      };
    }
    case ActionTypes.TOGGLE_REGION_MARKER_BOX: {
      return {
        ...region,
        isBoxOpen: isTargetRegion ? !region.isBoxOpen : false
      };
    }
    case ActionTypes.UPDATE_REGION: {
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
    case ActionTypes.SELECT_NEW_EVENT:
      return action.payload.selectedEventID;
    case ActionTypes.LOAD_EVENTS:
      return _.isEmpty(action.payload.events)
        ? {}
        : _.values(action.payload.events)[0].eventID;
    case ActionTypes.CREATE_NEW_EVENT:
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
