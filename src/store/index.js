import { createStore } from "redux";
import { rootReducer } from "../reducers";

export const initialState = {
  events: {},
  selectedEventID: -1,
  organiserID: 1
};

export const store = createStore(rootReducer, initialState);
