import api from "../api";
import { store } from "../store";
import { lastEmergencyNotificationTimestamp } from "../selectors";

export const pollEmergencyNotifications = eventID => {
  const lastTimestamp = lastEmergencyNotificationTimestamp(store.getState());
  return async dispatch =>
    dispatch({
      type: "POLL_EMERGENCY_NOTIFICATIONS",
      payload: {
        eventID: eventID,
        newNotifications: await api.emergency.getNotificationsSince(
          eventID,
          lastTimestamp
        )
      }
    });
};
