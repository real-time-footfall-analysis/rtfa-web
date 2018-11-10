import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import routes from "./CrowdApp.routing";
import styles from "./CrowdApp.module.scss";
import { connect } from "react-redux";
import { getSelectedEvent } from "./selectors";
import { loadEvents, selectEvent } from "./actions";
import { bindActionCreators } from "redux";

class CrowdApp extends Component {
  componentDidMount() {
    this.props.loadEvents(this.props.organiserID);
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
          <Routes />
        </div>
      </Router>
    );
  }
}

CrowdApp.propTypes = {
  events: PropTypes.object,
  selectedEvent: PropTypes.object,
  handleEventSelection: PropTypes.func,
  loadEvents: PropTypes.func,
  organiserID: PropTypes.number
};

const mapStateToProps = state => {
  return {
    events: state.events,
    selectedEvent: getSelectedEvent(state),
    organiserID: state.organiserID
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleEventSelection: selectEvent,
      loadEvents: loadEvents
    },
    dispatch
  );
};

const Routes = withRouter(({ location }) => (
  <div className={styles.main}>
    <Switch location={location}>
      {redirectHomeRoute}
      {routeElements}
    </Switch>
  </div>
));

const redirectHomeRoute = (
  <Route exact path="/" render={() => <Redirect to="/events" />} />
);

const routeElements = routes.map(route => (
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrowdApp);
