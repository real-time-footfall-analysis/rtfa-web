import { BASE_URL } from "../../constants";
import { RequestUtils } from "../utils/";

const emergencyNotificationsURL = `${BASE_URL}/live/emergency`;

export class EmergencyNotificationsAPI {
  static request = RequestUtils;

  static processEmergencyNotifications(notifications) {
    return notifications.sort((a, b) => b.occurredAt - a.occurredAt);
  }

  static async getAllNotifications(eventID) {
    return await this.getNotificationsSince(eventID);
  }

  static async resolveNotification(notification) {
    try {
      return await this.request.post(`${BASE_URL}/emergency-update`, {
        ...notification,
        dealtWith: true
      });
    } catch (err) {
      console.error(
        `Failed to resolve notification. Check the EventsAPI.resolveNotification function in 'api/index.js'`,
        err
      );
      return null;
    }
  }

  static async getNotificationsSince(eventID, timestamp = 0) {
    if (!eventID) {
      console.error(
        "You didn't pass an eventID into the EmergencyNotificationsAPI"
      );
    }
    try {
      return this.processEmergencyNotifications(
        await this.request.get(
          `${emergencyNotificationsURL}/${eventID}/${timestamp}`
        )
      );
    } catch (err) {
      console.error(
        `Failed to fetch notifications for (eventID: ${eventID}). Check the EventsAPI.getNotificationsSince function in 'api/index.js'`,
        err
      );
      return [];
    }
  }
}
