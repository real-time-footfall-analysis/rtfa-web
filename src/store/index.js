import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
  events: {},
  selectedEvent: {}
};
export const store = createStore(reducer, initialState);

export default store;
