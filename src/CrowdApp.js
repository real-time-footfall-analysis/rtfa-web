import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { store } from "./store";
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
        render={() => (
          <route.content name={route.name} description={route.description} />
        )}
      />
    ));
  }

  componentDidMount() {
    fetchEvents();
  }

  render() {
    return (
      <Router>
        <div className={styles.content}>
          <Sidebar
            links={routes.filter(route => route.inSidebar)}
            events={store.getState().events}
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
  store.dispatch({
    type: "LOAD_EVENTS",
    payload: {
      events: eventsMock
    }
  });
};

export default CrowdApp;
