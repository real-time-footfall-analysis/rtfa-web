/* global it */
import React from "react";
import ReactDOM from "react-dom";
import CrowdApp from "./CrowdApp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CrowdApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
