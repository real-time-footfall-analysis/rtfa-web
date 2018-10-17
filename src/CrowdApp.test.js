/* global it */
import React from "react";
import ReactDOM from "react-dom";
import CrowdApp from "./CrowdApp";
import { Provider } from "react-redux";
import { store } from "./store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <CrowdApp />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
