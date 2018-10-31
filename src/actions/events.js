import api from "../api";

export const loadEvents = organiserID => {
  return async dispatch =>
    dispatch({
      type: "LOAD_EVENTS",
      payload: {
        events: await api.events.getAll(organiserID)
      }
    });
};

export const selectEvent = event => {
  return {
    type: "SELECT_NEW_EVENT",
    payload: {
      selectedEventID: event.eventID
    }
  };
};

export const createNewEvent = newEvent => {
  return async dispatch =>
    dispatch({
      type: "CREATE_NEW_EVENT",
      payload: {
        event: await api.events.create(newEvent)
      }
    });
};
