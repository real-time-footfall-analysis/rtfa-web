import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const initialState = {
  events: {},
  selectedEventID: -1,
  organiserID: 1
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger, thunk)
);
