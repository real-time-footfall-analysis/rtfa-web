import _ from "lodash";
import { MAX_DECIMAL_PLACES, MILLISECONDS_IN_A_SECOND } from "../constants";

/* @param `timestamp` A UNIX timestamp in SECONDS
 * @returns A time string in the format HH:MM */
export const timestampToTimeString = timestamp => {
  const date = new Date(timestamp * MILLISECONDS_IN_A_SECOND);
  return date.toLocaleTimeString("enGB", {
    hour: "numeric",
    minute: "numeric"
  });
};

/* @param `timestamp` A UNIX timestamp in SECONDS
 * @returns A date string in the format "Thu, 15 November 2018" */
export const timestampToShortDateString = timestamp =>
  timestampToDateString(timestamp, false);

/* @param `timestamp` A UNIX timestamp in SECONDS
 * @returns A date string in the format "Thursday, 15 November 2018" */
export const timestampToLongDateString = timestamp =>
  timestampToDateString(timestamp, true);

/* @param `timestamp` A UNIX timestamp in SECONDS
 * @param `isLong` boolean: if true, days are long strings e.g. "Thursday"
 *                          if false, days are short strings e.g. "Thu"
 * @returns A date string in the format "<Weekday>, 29 Nov 2018" */
const timestampToDateString = (timestamp, isLong) => {
  const date = new Date(timestamp * MILLISECONDS_IN_A_SECOND);
  return date.toLocaleDateString("en-GB", {
    weekday: isLong ? "long" : "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

/* @returns The current UNIX timestamp in seconds. */
export const currentTimestamp = () => Math.floor(new Date().getTime() / 1000);

/* @params `seconds` A number of seconds
 * @returns Seconds converted to minutes, rounded to MAX_DECIMAL_PLACES. */
export const secondsToMinutes = seconds =>
  (seconds / 60).toFixed(MAX_DECIMAL_PLACES);

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
