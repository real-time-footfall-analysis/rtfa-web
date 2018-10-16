import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
  events: {},
  selectedEventID: ""
};
export const store = createStore(reducer, initialState);

export default store;
