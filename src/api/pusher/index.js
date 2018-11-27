import { PUSHER_API_KEY, PUSHER_API_OPTIONS } from "../../constants";
import Pusher from "pusher-js";

export class PusherAPI {
  static pusherInstance = new Pusher(PUSHER_API_KEY, PUSHER_API_OPTIONS);

  /* Trigger `callback` with new data, whenever an event with `eventName`
   * occurs in `channelName`. */
  static subscribe(channelName, eventName, callback) {
    const channel = this.pusherInstance.subscribe(channelName);
    channel.bind(eventName, data => callback(data));
  }
}
