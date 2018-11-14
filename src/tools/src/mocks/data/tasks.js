import _ from "lodash";
import { regions } from "./regions";

export let tasks = {
  1: [
    {
      eventID: 1,
      taskID: 1,
      result: {
        "39": 20,
        "40": 88.40333333333334,
        "41": 32.3,
        "42": 10.58,
        "50": 12,
        "51": 19
      }
    },
    {
      eventID: 1,
      taskID: 2,
      result: {
        "39": { bounceRate: 0.1, threshold: 150 },
        "40": { bounceRate: 0.3840333333333334, threshold: 150 },
        "41": { bounceRate: 0.4231, threshold: 150 },
        "42": { bounceRate: 0.4, threshold: 150 },
        "50": { bounceRate: 0.32, threshold: 150 },
        "51": { bounceRate: 0.29, threshold: 150 }
      }
    }
  ],
  2: [
    {
      eventID: 2,
      taskID: 1,
      result: {
        "11": 100.60975609756098,
        "12": 11,
        "13": 7
      }
    },
    {
      eventID: 2,
      taskID: 2,
      result: {
        "11": { bounceRate: 0.9, threshold: 300 },
        "12": { bounceRate: 0.2, threshold: 300 },
        "13": { bounceRate: 0.3, threshold: 300 }
      }
    }
  ],
  3: [
    {
      eventID: 3,
      taskID: 1,
      result: {
        "59": 12.60975609756098,
        "60": 96.86
      }
    },
    {
      eventID: 3,
      taskID: 2,
      result: {
        "59": { bounceRate: 0.4260975609756098, threshold: 600 },
        "60": { bounceRate: 0.3686, threshold: 600 }
      }
    }
  ]
};

/* Inserts a historical heat map task into a single taskList. */
const addHistoricalHeatMapToTaskList = (taskListForEvent, eventID) => {
  const timestamps = generateTimeStamps(10);
  return [
    ...taskListForEvent,
    {
      eventID: eventID,
      taskID: 4,
      result: {
        timestamps: timestamps,
        data: timestamps.reduce(
          (acc, timestamp) => ({
            ...acc,
            [timestamp]: generateHeatMap(eventID)
          }),
          {}
        )
      }
    }
  ];
};

/* Takes a map of eventID -> list of tasks, and inserts a historical
 * heatmap task into each task list. */
const addHistoricalHeatMapData = taskMap => {
  return _.reduce(
    taskMap,
    (acc, taskListForEvent, eventID) => {
      return {
        ...acc,
        [eventID]: addHistoricalHeatMapToTaskList(taskListForEvent, eventID)
      };
    },
    {}
  );
};

/* Generates a heatMap for all regions in an eventID.
 * TODO: Can be adapted to generate any region-specific data. */
const generateHeatMap = eventID => {
  const eventRegions = regions[eventID];
  return eventRegions.reduce(
    (acc, region) => ({
      ...acc,
      [region.regionID]: _.random(0, 1000)
    }),
    {}
  );
};

/* Creates an array of 'count' timestamps, starting from 'count' days ago
 * and ending with the previous day's timestamp. */
const generateTimeStamps = count => {
  const currentStamp = getCurrentUnixTimestamp();
  /* Default to 1 day steps. */
  const step = 86400;
  const firstStamp = currentStamp - count * step;
  const result = [];
  for (let stamp = firstStamp; stamp < currentStamp; stamp += step) {
    result.push(stamp);
  }
  return result;
};

const getCurrentUnixTimestamp = () => Math.round(new Date().getTime() / 1000);

/* Insert historical heat map data into the tasks object. */
tasks = addHistoricalHeatMapData(tasks);
