import _ from "lodash";
import { RequestUtils } from "../utils";
import { BASE_URL } from "../../constants";

export const eventsURL = `${BASE_URL}/events`;

export class EventsAPI {
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
