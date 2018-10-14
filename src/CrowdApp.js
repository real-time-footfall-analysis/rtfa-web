import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import routes from "./CrowdApp.routing";
import eventsMock from "./eventsMock";
import styles from "./CrowdApp.module.scss";

class CrowdApp extends Component {
  constructor(props) {
    super(props);
    this.redirectHomeRoute = (
      <Route exact path="/" render={() => <Redirect to="/events" />} />
    );
    this.routes = routes.map(route => (
      <Route
        key={route.path}
        name={route.name}
        path={route.path}
        exact={route.exact}
        render={() => <route.content name={route.name} />}
      />
    ));
  }

  render() {
    return (
      <Router>
        <div className={styles.content}>
          <Sidebar
            links={routes.filter(route => route.inSidebar)}
            events={fetchEvents()}
          />
          <div className={styles.main}>
            {this.redirectHomeRoute}
            {this.routes}
          </div>
        </div>
      </Router>
    );
  }
}

const fetchEvents = () => {
  return eventsMock;
};

export default CrowdApp;
