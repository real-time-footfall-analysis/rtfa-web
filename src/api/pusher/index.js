import { RequestUtils } from "../utils";
import { PUSHER_API_KEY, PUSHER_API_OPTIONS } from "../../constants";
import Pusher from "pusher-js";

export class PusherAPI {
  static request = RequestUtils;
  static pusherInstance = new Pusher(PUSHER_API_KEY, PUSHER_API_OPTIONS);

  static subscribe(channelName, eventName, callback) {
    const channel = this.pusherInstance.subscribe(channelName);
    channel.bind(eventName, callback);
  }
}
