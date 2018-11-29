import _ from "lodash";
import { MAX_DECIMAL_PLACES, MILLISECONDS_IN_A_SECOND } from "../constants";

/* Takes a UNIX timestamp in SECONDS and returns a date string in the
 * format DD/MM/YY */
export const timestampToDateString = timestamp => {
  const date = new Date(timestamp * MILLISECONDS_IN_A_SECOND);
  return date.toDateString();
};

export const timestampToTimeString = timestamp => {
  const date = new Date(timestamp * MILLISECONDS_IN_A_SECOND);
  return date.toLocaleTimeString("enGB", {
    hour: "numeric",
    minute: "numeric"
  });
};

/* @param timestamp A UNIX timestamp in SECONDS
 * @returns A date string in the format "Thu, 29 Nov 2018" */
export const timestampToShortDateString = timestamp => {
  const date = new Date(timestamp * MILLISECONDS_IN_A_SECOND);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

/* Takes a UNIX timestamp IN MILLISECONDS and returns a date string in the
 * format: "Thursday, 15 November 2018". */
export const timestampToLongDateString = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

/* @returns The current UNIX timestamp in seconds. */
export const currentTimestamp = () => Math.floor(new Date().getTime() / 1000);

/* `await sleep(someMilliseconds)` is equivalent to sleep in other languages. */
export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/* Converts a decimal value (e.g. 0.381423) to a percentage, rounded to
 * at most MAX_DECIMAL_PLACES (e.g. 38.14) */
export const decimalToPercentage = decimalVal =>
  +(decimalVal * 100).toFixed(MAX_DECIMAL_PLACES);

/* Returns the midpoint of the given region objects as a { lat, lng } object. */
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
