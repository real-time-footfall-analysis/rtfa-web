import { BASE_URL } from "../../constants";
import { RequestUtils } from "../utils/";
import { PusherAPI } from "../pusher";
import { PusherChannels } from "../pusher/channels";

const emergencyNotificationsURL = `${BASE_URL}/live/emergency`;

export class EmergencyNotificationsAPI {
  static request = RequestUtils;

  /* Sorts emergency notifications by occurredAt time. */
  static processEmergencyNotifications(notifications) {
    return notifications.sort((a, b) => b.occurredAt - a.occurredAt);
  }

  /* Return all notifications for the given eventID. */
  static async getAllNotifications(eventID) {
    return await this.getNotificationsSince(eventID);
  }

  /* Update the notification object on the server to contain dealtWith = true,
   * i.e. marks the given notification as resolved. */
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

  /* Return all notifications for the given eventID that occurred after
   * timestamp. Defaults to timestamp = 0, which will return all
   * notifications for the event. */
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

  /* Subscribe to emergency notifications for given eventID. Callback is
   * executed with new data every time an emergency update event occurs. */
  static subscribeToNotifications(eventID, callback) {
    const channel = PusherChannels.emergency;
    PusherAPI.subscribe(eventID, channel.eventTypes.emergencyUpdate, callback);
  }
}
