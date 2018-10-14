/* eslint-disable react/display-name */
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import NewEventPage from "./components/NewEventPage/NewEventPage";
import { EventsPage } from "./components/EventsPage/EventsPage";
import styles from "./App.module.scss";

const routes = [
  {
    path: "/events",
    name: "Events",
    exact: true,
    iconName: "calendar",
    content: EventsPage,
    inSidebar: false
  },
  {
    path: "/events/new",
    name: "Create New Event",
    content: NewEventPage,
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
  return [
    {
      name: "Leeds Festival",
      eventID: "312839",
      location: "Leeds, United Kingdom",
      startDate: "2018-08-25",
      endDate: "2018-08-30",
      maxAttendance: "150000"
    },
    {
      name: "Reading Festival",
      eventID: "312840",
      location: "Reading, United Kingdom",
      startDate: "2018-08-25",
      endDate: "2018-08-30",
      maxAttendance: "150000"
    },
    {
      name: "Glastonbury",
      eventID: "312841",
      location: "Somerset, United Kingdom",
      startDate: "2018-08-25",
      endDate: "2018-08-30",
      maxAttendance: "150000"
    }
  ];
};

export default CrowdApp;
