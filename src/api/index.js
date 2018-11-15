import axios from "axios";
import _ from "lodash";
import {
  BASE_URL,
  HISTORICAL_HEATMAP_TASK_ID,
  TASKS_METADATA
} from "../constants";

const eventsURL = `${BASE_URL}/events`;
const heatmapURL = `${BASE_URL}/live/heatmap`;
const emergencyNotificationsURL = `${BASE_URL}/live/emergency`;

class RequestUtils {
  static async get(url, params) {
    return this.executeRequest("GET", url, {
      params: {
        ...params
      }
    });
  }

  static async post(url, payload) {
    return this.executeRequest("POST", url, payload);
  }

  static async put(url, payload) {
    return this.executeRequest("PUT", url, payload);
  }

  static async executeRequest(type, url, payload) {
    let response = this.fetchResponse(type, url, payload);
    response.catch(console.error);
    return (await response).data;
  }

  static fetchResponse(type, url, payload) {
    switch (type) {
      case "GET":
        return axios.get(url, payload);
      case "POST":
        return axios.post(url, payload);
      case "PUT":
        return axios.put(url, payload);
      default:
        console.error(
          `You are trying to execute the following type of request, which doesn't exist: ${type}`
        );
        return {};
    }
  }
}

class EventsAPI {
  static request = RequestUtils;

  /* Returns all events for the given organiserID. */
  static async getAll(organiserID) {
    const eventData = await this.request.get(eventsURL, {
      organiserId: organiserID
    });

    /* Fetch regions and inject them into the event objects. */
    const eventDataWithRegions = eventData.map(this._injectRegions);

    /* Resolve promises array and convert array of Events into an
     * object keyed by eventID. */
    return Promise.all(eventDataWithRegions).then(eventData =>
      _.keyBy(eventData, "eventID")
    );
  }

  static async create(newEvent) {
    return this.request.post(eventsURL, newEvent);
  }

  static async getRegions(eventID) {
    return this.request.get(`${eventsURL}/${eventID}/regions`);
  }

  static async updateRegion(eventID, newRegion) {
    return this.request.put(
      `${eventsURL}/${eventID}/regions/${newRegion.regionID}`,
      newRegion
    );
  }

  static async addRegions(eventID, ...newRegions) {
    const formattedRegions = newRegions.map(region =>
      EventsAPI._reformatOutgoingRegion(region, eventID)
    );
    const response = await this.request.post(
      `${eventsURL}/${eventID}/regions`,
      formattedRegions
    );
    return response.map(EventsAPI._reformatIncomingRegion);
  }

  /* Fetches the regions for the given event and returns a new
   * event object with the regions inserted. */
  static async _injectRegions(event) {
    try {
      let regions = await EventsAPI.getRegions(event.eventID);
      regions = regions.map(EventsAPI._reformatIncomingRegion);
      return {
        ...event,
        regions: _.keyBy(regions, "regionID")
      };
    } catch (err) {
      console.error(
        `Failed to fetch regions for ${event.name} (eventID: ${
          event.eventID
        }). Check the EventsAPI._injectRegions function in 'api/index.js'`,
        err
      );
      return {
        ...event,
        regions: {}
      };
    }
  }

  /* Reformats the region object returned by the backend
   * to store lat/lng under a "position" key, instead of
   * naked keys on the object.*/
  static _reformatIncomingRegion(region) {
    const regionWithoutLatLng = _.omit(region, ["lat", "lng"]);
    return {
      ...regionWithoutLatLng,
      position: {
        lat: region.lat,
        lng: region.lng
      }
    };
  }

  /* Reformats the region object returned by the backend
   * to store lat/lng under a "position" key, instead of
   * naked keys on the object.*/
  static _reformatOutgoingRegion(region, eventID) {
    const regionWithoutLatLng = _.omit(region, ["position", "isBoxOpen"]);
    return {
      ...regionWithoutLatLng,
      name: region.name ? region.name : "Unnamed Region",
      lat: region.position.lat,
      lng: region.position.lng,
      eventID: eventID
    };
  }
}

class HeatMapAPI {
  static request = RequestUtils;

  static async getHeatMapData(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getHeatMapData");
    }
    return await this.request.get(`${heatmapURL}/${eventID}`);
  }

  static async getHistoricalHeatMapData(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getHistoricalHeatMapData");
    }
    const data = await this.request.get(
      `${eventsURL}/${eventID}/tasks/${HISTORICAL_HEATMAP_TASK_ID}`
    );
    return data;
  }
}

class TasksAPI {
  static request = RequestUtils;
  static taskIDs = Object.keys(TASKS_METADATA);

  static async getDataForAllTasks(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getDataForAllTasks");
    }
    const results = this.taskIDs.map(taskID => {
      return this.request.get(`${eventsURL}/${eventID}/tasks/${taskID}`);
    });
    return Promise.all(results.map(p => p.catch(() => undefined)));
  }
}

class EmergencyNotificationsAPI {
  static request = RequestUtils;

  static async getAllNotifications(eventID) {
    return await this.getNotificationsSince(eventID);
  }

  static async getNotificationsSince(eventID, timestamp = 0) {
    if (!eventID) {
      console.error(
        "You didn't pass an eventID into the EmergencyNotificationsAPI"
      );
    }
    try {
      return await this.request.get(
        `${emergencyNotificationsURL}/${eventID}/${timestamp}`
      );
    } catch (err) {
      console.error(
        `Failed to fetch notifications for (eventID: ${eventID}). Check the EventsAPI.getNotificationsSince function in 'api/index.js'`,
        err
      );
      return [];
    }
  }
}

class API {
  static events = EventsAPI;
  static heatMap = HeatMapAPI;
  static tasks = TasksAPI;
  static emergency = EmergencyNotificationsAPI;
}

export default API;
