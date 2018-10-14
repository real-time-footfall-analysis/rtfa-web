import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "./index.scss";
import CrowdApp from "./CrowdApp";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

const render = () =>
  ReactDOM.render(<CrowdApp />, document.getElementById("root")); // eslint-disable-line
store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
