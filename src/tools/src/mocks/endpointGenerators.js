import _ from "lodash";
import { RequestTypes } from "./requestTypes";

/* Given an array of resources, returns a single endpoint per event for
 * accessing all of those resources. */
export const generateAllSubresourceEndpoint = (
  events,
  resources,
  pluralResourceName,
  requestType = RequestTypes.GET
) => {
  return _.reduce(
    events,
    (endpoints, event) => ({
      ...endpoints,
      [`/events/${event.eventID}/${pluralResourceName}`]: {
        [requestType]: resources[event.eventID] ? resources[event.eventID] : []
      }
    }),
    {}
  );
};

/* Given an object of resources keyed by eventID, returns endpoints
 * for all of those resources.
 *
 * @param resources = { 1: [ { regionID: 39 } ] }
 * @param pluralResourceName = "regions"
 * @param resourceIDProperty = "regionID"
 * @returns [{"/events/1/regions/39": { get: { regionID: 42 }}}]
 */
export const generateSubresourceEndpoints = (
  resources,
  pluralResourceName,
  resourceIDProperty,
  requestType = RequestTypes.GET
) => {
  return _.reduce(
    _.map(resources, _.identity),
    (endpoints, resourcesForEvent) => {
      const endpointsForCurrentEvent = generateSingleEventSubresourceEndpoints(
        resourcesForEvent,
        pluralResourceName,
        resourceIDProperty,
        requestType
      );
      return {
        ...endpoints,
        ...endpointsForCurrentEvent
      };
    },
    {}
  );
};

/* Helper function for generateSubresourceEndpoints. Takes a list of
 * subresources of an event (e.g. tasks/regions) and returns an endpoints
 * object. */
const generateSingleEventSubresourceEndpoints = (
  resourceList,
  pluralResourceName,
  idProperty,
  requestType = RequestTypes.GET
) =>
  resourceList.reduce(
    (resourceEndpoints, resource) => ({
      ...resourceEndpoints,
      [`/events/${resource.eventID}/${pluralResourceName}/${
        resource[idProperty]
      }`]: {
        [requestType]: resource
      }
    }),
    {}
  );
