import { createStore } from "redux";
import { rootReducer } from "../reducers";

const initialState = {
  events: {},
  selectedEventID: ""
};
export const store = createStore(rootReducer, initialState);

export default store;
