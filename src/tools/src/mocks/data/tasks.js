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
        "41": 32,
        "42": 10,
        "50": 12,
        "51": 19
      }
    },
    {
      eventID: 1,
      taskID: 2,
      result: {
        "39": 10,
        "40": 38.40333333333334,
        "41": 42.31,
        "42": 40,
        "50": 32,
        "51": 29
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
        "11": 9,
        "12": 20,
        "13": 30
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
        "59": 42.60975609756098,
        "60": 36.86
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
      timestamps: timestamps,
      data: timestamps.reduce(
        (acc, timestamp) => ({
          ...acc,
          [timestamp]: generateHeatMap(eventID)
        }),
        {}
      )
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
