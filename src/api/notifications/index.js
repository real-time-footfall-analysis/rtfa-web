import { RequestUtils } from "../utils";
import { eventsURL } from "../events";

export class NotificationsAPI {
  static request = RequestUtils;

  /* Returns a promise for an array containing all sent notifications. */
  static async getAll(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into NotificationsAPI.getAll");
      return;
    }
    return await this.request.get(`${eventsURL}/${eventID}/notifications`);
  }

  static async sendNotification(eventID, notification) {
    if (!eventID) {
      console.error(
        "You didn't pass an eventID into NotificationsAPI.sendNotification"
      );
    }
    return await this.request.post(
      `${eventsURL}/${eventID}/notifications`,
      notification
    );
  }
}
