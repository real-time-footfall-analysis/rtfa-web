import { RequestUtils } from "../utils";
import { eventsURL } from "../events";

export class NotificationsAPI {
  static request = RequestUtils;

  /* Get all notifications for an event.
   *
   * @param eventID The eventID to fetch all notifications for.
   * @returns A promise for an array containing all sent notifications. */
  static async getAll(eventID) {
    if (!eventID) {
      console.error("You didn't pass an eventID into NotificationsAPI.getAll");
      return;
    }
    return await this.request.get(`${eventsURL}/${eventID}/notifications`);
  }

  /* Sends a POST request containing the given notification object to the
   * API for delivery.
   *
   * @param eventID The eventID to submit the notification to.
   * @param notification The notification object to be delivered to attendees.
   * @returns A promise containing the version of the notification object
   *          that the API stored (with additional fields).
   */
  static async send(eventID, notification) {
    if (!eventID) {
      console.error("You didn't pass an eventID into NotificationsAPI.send");
    }
    return await this.request.post(
      `${eventsURL}/${eventID}/notifications`,
      notification
    );
  }
}
