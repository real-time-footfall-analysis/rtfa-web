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
      const updatedEvents = {
        ...state.events
      };
      updatedEvents[action.payload.event.eventID] = action.payload.event;
      return {
        ...state,
        events: updatedEvents,
        selectedEventID: action.payload.eventID
      };
    }
    default: {
      return state;
    }
  }
};
