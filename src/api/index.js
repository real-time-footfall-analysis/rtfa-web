import axios from "axios";
import _ from "lodash";

export const BASE_URL =
  "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";
const eventsURL = `${BASE_URL}/events`;

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
  static async getAll(organiserID) {
    const eventData = await this.request.get(eventsURL, {
      organiserId: organiserID
    });
    /* Convert array into object keyed by eventID. */
    return _.keyBy(eventData, "eventID");
  }

  static async create(newEvent) {
    return this.request.post(eventsURL, newEvent);
  }
}

class API {
  static events = EventsAPI;
}

export default API;
