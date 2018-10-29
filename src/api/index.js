import axios from "axios";
import _ from "lodash";

export const BASE_URL =
  "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";
const eventsURL = `${BASE_URL}/events`;

export default {
  events: {
    getAll: async organiserID => {
      const eventData = await request.get(eventsURL, {
        organiserId: organiserID
      });
      /* Convert array into object keyed by eventID. */
      return _.keyBy(eventData, "eventID");
    },
    create: async newEvent => {
      return request.post(eventsURL, newEvent);
    }
  }
};

const request = {
  get: async (url, params) => {
    return executeRequest("GET", url, {
      params: {
        ...params
      }
    });
  },
  post: async (url, payload) => {
    return executeRequest("POST", url, payload);
  }
};

const executeRequest = async (type, url, payload) => {
  let response;
  switch (type) {
    case "GET":
      response = axios.get(url, payload);
      break;
    case "POST":
      response = axios.post(url, payload);
      break;
    default:
      response = {};
      console.error(
        `You are trying to execute the following invalid type of request: ${type}`
      );
  }
  response.catch(console.error);
  return (await response).data;
};
