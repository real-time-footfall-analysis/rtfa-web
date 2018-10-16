import _ from "lodash";

export default (state, action) => {
  switch (action.type) {
    /* LOAD_EVENTS: Called when the list of events is loaded from the server. */
    case "LOAD_EVENTS": {
      return {
        ...state,
        selectedEventID: _.isEmpty(action.payload.events)
          ? {}
          : _.values(action.payload.events)[0].eventID,
        events: action.payload.events
      };
    }
    /* SELECT_NEW_EVENT: Called when a different event is selected in the
     * sidebar. */
    case "SELECT_NEW_EVENT": {
      return {
        ...state,
        selectedEventID: action.payload.selectedEventID
      };
    }
    /* CREATE_NEW_EVENT: Called when a new event is successfully created */
    case "CREATE_NEW_EVENT": {
      const updatedEvents = createUpdatedObject(
        state.events,
        action.payload.event.eventID,
        action.payload.event
      );
      return {
        ...state,
        events: updatedEvents,
        selectedEventID: action.payload.event.eventID
      };
    }
    /* CREATE_NEW_REGION_MARKER: Called when the user adds a new marker to
     * the map for the current event. */
    case "CREATE_NEW_REGION_MARKER": {
      const oldEvent = state.events[state.selectedEventID];
      const updatedEvent = {
        ...oldEvent,
        markers: [...oldEvent.markers, { position: action.payload.position }]
      };
      const updatedEvents = createUpdatedObject(
        state.events,
        state.selectedEventID,
        updatedEvent
      );
      return {
        ...state,
        events: updatedEvents
      };
    }
    /* DELETE_REGION_MARKER: Called when the user removes a marker from the map
     * for the current event. */
    case "DELETE_REGION_MARKER": {
      const oldEvent = state.events[state.selectedEventID];
      const updatedEvent = {
        ...oldEvent,
        markers: oldEvent.markers.filter(
          marker => marker.position !== action.payload.position
        )
      };
      const updatedEvents = createUpdatedObject(
        state.events,
        state.selectedEventID,
        updatedEvent
      );
      return {
        ...state,
        events: updatedEvents
      };
    }
    default: {
      return state;
    }
  }
};

const createUpdatedObject = (parentObject, keyToUpdate, updatedValue) => {
  const updatedParent = {
    ...parentObject
  };
  updatedParent[keyToUpdate] = updatedValue;
  return updatedParent;
};
