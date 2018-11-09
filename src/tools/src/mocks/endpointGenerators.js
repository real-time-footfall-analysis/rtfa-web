import _ from "lodash";

/* Given an object of resources keyed by eventID, returns a list of endpoints
 * for all of those resources. */
export const generateSubresourceEndpoints = (
  resources,
  pluralResourceName,
  resourceIDProperty
) => {
  return _.reduce(
    _.map(resources, _.id),
    (endpoints, resourcesForEvent) => {
      const endpointsForCurrentEvent = generateSingleEventSubresourceEndpoints(
        resourcesForEvent,
        pluralResourceName,
        resourceIDProperty
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
  idProperty
) =>
  resourceList.reduce(
    (resourceEndpoints, resource) => ({
      ...resourceEndpoints,
      [`/events/${resource.eventID}/${pluralResourceName}/${
        resource[idProperty]
      }`]: {
        get: resource
      }
    }),
    {}
  );
