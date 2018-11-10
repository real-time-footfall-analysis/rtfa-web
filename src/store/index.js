import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export const initialState = {
  events: {},
  selectedEventID: -1,
  organiserID: 1
};

const logger = createLogger({ collapsed: true });
export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger, thunk)
);
