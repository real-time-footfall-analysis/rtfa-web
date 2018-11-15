import api from "../api";
import { store } from "../store";
import { lastEmergencyNotificationTimestamp } from "../selectors";

export const pollEmergencyNotifications = eventID => {
  if (!eventID) {
    return {
      type: "NOT_READY_TO_POLL_EMERGENCY_NOTIFICATIONS"
    };
  }
  const lastTimestamp = lastEmergencyNotificationTimestamp(store.getState());
  return async dispatch =>
    dispatch({
      type: "POLL_EMERGENCY_NOTIFICATIONS",
      payload: {
        eventID: eventID,
        newNotifications: await api.emergency.getNotificationsSince(
          eventID,
          lastTimestamp + 1
        )
      }
    });
};
