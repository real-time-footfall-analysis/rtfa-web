export const getSelectedEvent = state => {
  const selectedEvent = state.events[state.selectedEventID];
  return selectedEvent ? selectedEvent : {};
};
