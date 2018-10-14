import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../store";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";
import EventSelector from "./EventSelector/EventSelector";

class Sidebar extends Component {
  handleEventSelection(event) {
    store.dispatch({
      type: "SELECT_NEW_EVENT",
      payload: {
        selectedEvent: event
      }
    });
  }

  render() {
    return (
      <nav className={styles.sidebar}>
        <Link to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>

        <div className={styles.eventSelector}>
          <EventSelector
            selectedEvent={store.getState().selectedEvent}
            events={this.props.events}
            handleEventSelection={this.handleEventSelection}
          />
        </div>

        <NavList {...this.props} />
      </nav>
    );
  }
}

Sidebar.propTypes = {
  events: PropTypes.object
};

export default Sidebar;
