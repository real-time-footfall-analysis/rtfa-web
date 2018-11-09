import _ from "lodash";
import { generateSubresourceEndpoints } from "./endpointGenerators";
import { events, regions, tasks, heatMaps } from "./data";

const fs = require("fs");

const allEventsEndpoint = {
  "/events": {
    get: events
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

const allEndpoints = {
  ...allEventsEndpoint,
  ...individualEventEndpoints,
  ...allRegionsEndpoint,
  ...individualRegionEndpoints,
  ...individualTaskEndpoints,
  ...heatMapEndpoints
};

fs.writeFile("dist/mocks/data.json", JSON.stringify(allEndpoints), err => {
  if (err) throw err;
  console.log("Saved endpoints file to data.json");
});
