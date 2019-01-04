import { RequestUtils } from "../utils";
import { BASE_URL, HISTORICAL_HEATMAP_TASK_ID } from "../../constants";
import { eventsURL } from "../events";

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
    const response = await this.request.get(
      `${eventsURL}/${eventID}/tasks/${HISTORICAL_HEATMAP_TASK_ID}`
    );
    if (!response || !response.result) {
      return {};
    }
    /* Discard the "task" wrapper around the historical heatMap data */
    return response.result;
  }
}
