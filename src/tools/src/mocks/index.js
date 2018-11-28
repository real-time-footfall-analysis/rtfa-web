import _ from "lodash";
import {
  generateAllSubresourceEndpoint,
  generateSubresourceEndpoints
} from "./endpointGenerators";
import {
  events,
  newEvent,
  regions,
  tasks,
  heatMaps,
  sentNotifications
} from "./data";

const fs = require("fs");

/* @endpoint /events */
const allEventsEndpoint = {
  "/events": {
    get: events,
    post: newEvent
  }
};

/* @endpoint /events/{eventID} */
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

/* @endpoint /events/{eventID}/regions */
const allRegionsEndpoint = generateAllSubresourceEndpoint(
  events,
  regions,
  "regions"
);

/* @endpoint /events/{eventID}/regions/{regionID} */
const individualRegionEndpoints = generateSubresourceEndpoints(
  regions,
  "regions",
  "regionID"
);

/* @endpoint /events/{eventID}/tasks/{taskID} */
const individualTaskEndpoints = generateSubresourceEndpoints(
  tasks,
  "tasks",
  "taskID"
);

/* @endpoint /live/heatmap/${eventID} */
const heatMapEndpoints = _.reduce(
  heatMaps,
  (endpoints, heatMap, eventID) => ({
    ...endpoints,
    [`/live/heatmap/${eventID}`]: { get: heatMap }
  }),
  {}
);

/* @endpoint /events/{eventID}/notifications */
const sentNotificationsEndpoint = generateAllSubresourceEndpoint(
  events,
  sentNotifications,
  "notifications"
);

/* @endpoint /events/{eventID}/notifications/{notificationId} */
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

/* Write allEndpoints to data.json (which is then used as the config file for
 * mock-json-server). */
fs.writeFile("dist/mocks/data.json", JSON.stringify(allEndpoints), err => {
  if (err) throw err;
  console.log("Saved endpoints file to data.json");
});
