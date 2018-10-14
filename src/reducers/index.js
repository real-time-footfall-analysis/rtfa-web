import _ from "lodash";

export default (state, action) => {
  switch (action.type) {
    /* LOAD_EVENTS: Called when the list of events is loaded from the server. */
    case "LOAD_EVENTS":
      return {
        ...state,
        selectedEvent: _.isEmpty(action.payload.events)
          ? {}
          : _.values(action.payload.events)[0],
        events: action.payload.events
      };

    /* SELECT_NEW_EVENT: Called when a different event is selected in the
     * sidebar. */
    case "SELECT_NEW_EVENT":
      return {
        ...state,
        selectedEvent: action.payload.selectedEvent
      };
    default:
      return state;
  }
};
