import { BASE_URL, HISTORICAL_HEATMAP_TASK_ID } from "../constants";
import { RequestUtils } from "./utils";
import { eventsURL } from "./events";

const heatMapURL = `${BASE_URL}/live/heatmap`;

export class HeatMapAPI {
  static request = RequestUtils;

  static async getHeatMapData(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getHeatMapData");
    }
    return await this.request.get(`${heatMapURL}/${eventID}`);
  }

  static async getHistoricalHeatMapData(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into getHistoricalHeatMapData");
    }
    return await this.request.get(
      `${eventsURL}/${eventID}/tasks/${HISTORICAL_HEATMAP_TASK_ID}`
    );
  }
}
