import _ from "lodash";

export const calculateMidpointOfRegions = regions => {
  if (_.size(regions) === 0) {
    return { lat: 51.507441, lng: -0.127683 };
  }
  const { latSum, lngSum } = _.reduce(
    regions,
    ({ latSum, lngSum }, region) => {
      return {
        latSum: latSum + region.position.lat,
        lngSum: lngSum + region.position.lng
      };
    },
    { latSum: 0, lngSum: 0 }
  );
  return {
    lat: latSum / _.size(regions),
    lng: lngSum / _.size(regions)
  };
};
