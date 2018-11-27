import _ from "lodash";
import { generateSubresourceEndpoints } from "./endpointGenerators";
import {
  events,
  newEvent,
  regions,
  tasks,
  heatMaps,
  sentNotifications
} from "./data";

const fs = require("fs");

const allEventsEndpoint = {
  "/events": {
    get: events,
    post: newEvent
  }
};

const individualEventEndpoints = _.reduce(
  events,
  (endpoints, event) => ({
    ...endpoints,
    [`/events/${event.eventID}`]: {
      get: event
    }
  }),
  {}
);

const allRegionsEndpoint = _.reduce(
  events,
  (endpoints, event) => ({
    ...endpoints,
    [`/events/${event.eventID}/regions`]: {
      get: regions[event.eventID] ? regions[event.eventID] : []
    }
  }),
  {}
);

const individualRegionEndpoints = generateSubresourceEndpoints(
  regions,
  "regions",
  "regionID"
);

const individualTaskEndpoints = generateSubresourceEndpoints(
  tasks,
  "tasks",
  "taskID"
);

const heatMapEndpoints = _.reduce(
  heatMaps,
  (endpoints, heatMap, eventID) => ({
    ...endpoints,
    [`/live/heatmap/${eventID}`]: { get: heatMap }
  }),
  {}
);

const sentNotificationsEndpoint = _.reduce(
  events,
  (endpoints, event) => ({
    ...endpoints,
    [`/events/${event.eventID}/notifications`]: {
      get: sentNotifications[event.eventID]
        ? sentNotifications[event.eventID]
        : []
    }
  }),
  {}
);

const individualNotificationEndpoints = generateSubresourceEndpoints(
  sentNotifications,
  "notifications",
  "notificationId"
);

const allEndpoints = {
  ...allEventsEndpoint,
  ...individualEventEndpoints,
  ...allRegionsEndpoint,
  ...individualRegionEndpoints,
  ...individualTaskEndpoints,
  ...heatMapEndpoints,
  ...sentNotificationsEndpoint,
  ...individualNotificationEndpoints
};

fs.writeFile("dist/mocks/data.json", JSON.stringify(allEndpoints), err => {
  if (err) throw err;
  console.log("Saved endpoints file to data.json");
});
