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
  sentNotifications,
  newSentNotification
} from "./data";

const fs = require("fs");

/* @endpoint GET /events */
const allEventsEndpoint = {
  "/events": {
    get: events,
    post: newEvent
  }
};

/* @endpoint GET /events/{eventID} */
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

/* @endpoint GET /events/{eventID}/regions */
const allRegionsEndpoint = generateAllSubresourceEndpoint(
  events,
  regions,
  "regions"
);

/* @endpoint GET /events/{eventID}/regions/{regionID} */
const individualRegionEndpoints = generateSubresourceEndpoints(
  regions,
  "regions",
  "regionID"
);

/* @endpoint GET /events/{eventID}/tasks/{taskID} */
const individualTaskEndpoints = generateSubresourceEndpoints(
  tasks,
  "tasks",
  "taskID"
);

/* @endpoint GET /live/heatmap/${eventID} */
const heatMapEndpoints = _.reduce(
  heatMaps,
  (endpoints, heatMap, eventID) => ({
    ...endpoints,
    [`/live/heatmap/${eventID}`]: { get: heatMap }
  }),
  {}
);

/* @endpoint GET /events/{eventID}/notifications */
const sentNotificationsEndpoint = generateAllSubresourceEndpoint(
  events,
  sentNotifications,
  "notifications"
);

/* @endpoint POST /events/1/notifications
 *  This endpoint only exists for Event 1, the time + effort of making it
 *  generic for all events wasn't worth it. */
sentNotificationsEndpoint[`/events/1/notifications`] = {
  ...sentNotificationsEndpoint[`/events/1/notifications`],
  post: {
    data: newSentNotification
  }
};

/* @endpoint GET /events/{eventID}/notifications/{notificationId} */
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
