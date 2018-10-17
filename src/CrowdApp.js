import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import routes from "./CrowdApp.routing";
import eventsMock from "./eventsMock";
import styles from "./CrowdApp.module.scss";
import { connect } from "react-redux";
import { getSelectedEvent } from "./selectors";
import { eventsLoaded, selectEvent } from "./actions";
import { bindActionCreators } from "redux";

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
    fetchEvents(this.props.eventsLoaded);
  }

  render() {
    return (
      <Router>
        <div className={styles.content}>
          <Sidebar
            links={routes.filter(route => route.inSidebar)}
            events={this.props.events}
            selectedEvent={this.props.selectedEvent}
            handleEventSelection={this.props.handleEventSelection}
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

CrowdApp.propTypes = {
  events: PropTypes.object,
  selectedEvent: PropTypes.object,
  handleEventSelection: PropTypes.func,
  eventsLoaded: PropTypes.func
};

const fetchEvents = eventsLoaded => {
  eventsLoaded(eventsMock);
};

const mapStateToProps = state => {
  return {
    events: state.events,
    selectedEvent: getSelectedEvent(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleEventSelection: selectEvent,
      eventsLoaded: eventsLoaded
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrowdApp);
