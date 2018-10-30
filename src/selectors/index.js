export const getSelectedEvent = state => {
  if (!state.events) {
    return {};
  }
  const selectedEvent = state.events[state.selectedEventID];
  return selectedEvent ? selectedEvent : {};
};

export const getRegions = state => {
  const selectedEvent = getSelectedEvent(state);
  if (!selectedEvent) {
    return {};
  }
  const regions = selectedEvent.regions;
  return regions ? regions : {};
};

export const getRegion = (state, id) => {
  const selectedEvent = getSelectedEvent(state);
  if (!selectedEvent) {
    return {};
  }
  const selectedRegion = selectedEvent.regions[id];
  return selectedRegion ? selectedRegion : {};
};
