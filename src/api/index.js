import axios from "axios";
import _ from "lodash";

export const BASE_URL =
  "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";

export default {
  events: {
    getAll: async organiserID => {
      let eventsResponse = await axios.get(`${BASE_URL}/events`, {
        params: {
          organiserId: organiserID
        }
      });

      // /* Add coverPhoto field. */
      // eventsResponse = _.map(eventsResponse.data, event => ({
      //   ...event,
      //   coverPhoto: event.coverPhotoUrl
      // }));
      //
      // /* Remove coverPhotoUrl field. */
      // eventsResponse = _.map(eventsResponse, event => {
      //   delete event["coverPhotoUrl"];
      //   return event;
      // });

      /* Convert array into object keyed by eventID. */
      return _.keyBy(eventsResponse.data, "eventID");
    }
  }
};
