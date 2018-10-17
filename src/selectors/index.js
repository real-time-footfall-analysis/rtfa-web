export const getSelectedEvent = state => {
  if (!state.events) {
    return {};
  }
  const selectedEvent = state.events[state.selectedEventID];
  return selectedEvent ? selectedEvent : {};
};

export const getMarkers = state => {
  const selectedEvent = getSelectedEvent(state);
  if (!selectedEvent) {
    return {};
  }
  const markers = selectedEvent.markers;
  return markers ? markers : {};
};

export const getMarker = (state, id) => {
  const selectedEvent = getSelectedEvent(state);
  if (!selectedEvent) {
    return {};
  }
  const selectedMarker = selectedEvent.markers[id];
  return selectedMarker ? selectedMarker : {};
};

export const getMarkerName = (state, id) => {
  const marker = getMarker(state, id);
  return marker.name ? marker.name : "";
};
