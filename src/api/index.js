import axios from "axios";
import _ from "lodash";

export const BASE_URL =
  "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";
const eventsURL = `${BASE_URL}/events`;

export default {
  events: {
    getAll: async organiserID => {
      const eventsResponse = axios.get(eventsURL, {
        params: {
          organiserId: organiserID
        }
      });
      eventsResponse.catch(console.error);
      const eventData = (await eventsResponse).data;
      /* Convert array into object keyed by eventID. */
      return _.keyBy(eventData, "eventID");
    },
    create: async newEvent => {
      let newEventResponse = axios.post(eventsURL, newEvent);
      newEventResponse.catch(console.error);
      return (await newEventResponse).data;
    }
  }
};
