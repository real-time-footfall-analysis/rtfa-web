import { RequestUtils } from "../utils";
import { TASKS_METADATA } from "../../constants";
import { eventsURL } from "../events";

export class TasksAPI {
  static request = RequestUtils;
  static taskIDs = Object.keys(TASKS_METADATA);

  static async getDataForAllTasks(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getDataForAllTasks");
    }
    const results = this.taskIDs.map(taskID => {
      return this.request.get(`${eventsURL}/${eventID}/tasks/${taskID}`);
    });
    return Promise.all(results.map(p => p.catch(() => undefined)));
  }
}
