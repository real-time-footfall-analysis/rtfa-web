import { createStore } from "redux";
import { rootReducer } from "../reducers";

const initialState = {
  events: {},
  selectedEventID: ""
};
export const store = createStore(rootReducer, initialState);

export const getSelectedEvent = () => {
  const selectedEvent = store.getState().events[
    store.getState().selectedEventID
  ];
  return selectedEvent ? selectedEvent : {};
};

export default store;
