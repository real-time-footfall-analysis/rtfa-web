export const eventsLoaded = events => ({
  type: "LOAD_EVENTS",
  payload: {
    events: events
  }
});

export const selectEvent = event => ({
  type: "SELECT_NEW_EVENT",
  payload: {
    selectedEventID: event.eventID
  }
});

export const createNewEvent = event => ({
  type: "CREATE_NEW_EVENT",
  payload: {
    event: event
  }
});
