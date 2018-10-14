/* eslint-disable react/display-name */
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import NewEventForm from "./components/NewEventForm/NewEventForm";
import { EventsPage } from "./components/EventsPage/EventsPage";
import styles from "./App.module.scss";

const routes = [
  {
    path: "/events",
    name: "Events",
    exact: true,
    iconName: "calendar",
    content: EventsPage,
    inSidebar: true
  },
  {
    path: "/events/new",
    name: "Create New Event",
    content: NewEventForm,
    inSidebar: false
  },
  {
    path: "/maps",
    name: "Maps",
    iconName: "map",
    content: () => <h1>Maps Page</h1>,
    inSidebar: true
  },
  {
    path: "/regionGroups",
    name: "Region Groups",
    shortName: "Groups",
    iconName: "layer-group",
    content: () => <h1>Region Groups</h1>,
    inSidebar: true
  },
  {
    path: "/regions",
    name: "Regions",
    iconName: "object-ungroup",
    content: () => <h1>Regions</h1>,
    inSidebar: true
  }
];

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
          <Sidebar links={routes.filter(route => route.inSidebar)} />
          <div className={styles.main}>
            {this.redirectHomeRoute}
            {this.routes}
          </div>
        </div>
      </Router>
    );
  }
}

export default CrowdApp;
