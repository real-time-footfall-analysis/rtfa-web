import _ from "lodash";
import { secondsToMinutes } from "../../utils";

export class TaskTransformers {
  static popularTimes(taskData) {
    return {
      ...taskData,
      result: {
        ...taskData.result.counts
      }
    };
  }

  static averageStayTime(taskData) {
    return {
      ...taskData,
      result: _.mapValues(taskData.result, secondsToMinutes)
    };
  }
}
