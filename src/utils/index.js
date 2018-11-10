import _ from "lodash";

/* Takes a UNIX timestamp and returns a date string in the format DD/MM/YY */
export const timestampToDateString = timestamp => {
  const date = new Date(timestamp * 1000);
  const shortYear = date
    .getFullYear()
    .toString()
    .slice(2, 4);
  return `${date.getDate()}/${date.getMonth() + 1}/${shortYear}`;
};

/* `await sleep(someMilliseconds)` is equivalent to sleep in other languages. */
export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

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
