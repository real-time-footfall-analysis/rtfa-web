import { EventsAPI } from "./events";
import { HeatMapAPI } from "./heatMap";
import { TasksAPI } from "./tasks";
import { EmergencyNotificationsAPI } from "./notifications";

class API {
  static events = EventsAPI;
  static heatMap = HeatMapAPI;
  static tasks = TasksAPI;
  static emergency = EmergencyNotificationsAPI;
}

export default API;
