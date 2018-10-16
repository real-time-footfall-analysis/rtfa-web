import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../store";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";
import EventSelector from "./EventSelector/EventSelector";
import PhotoText from "../UI/PhotoText/PhotoText";
import Button from "../UI/Button/Button";

class Sidebar extends Component {
  handleEventSelection(event) {
    store.dispatch({
      type: "SELECT_NEW_EVENT",
      payload: {
        selectedEventID: event.eventID
      }
    });
  }

  render() {
    const selectedEventID = store.getState().selectedEventID,
      selectedEvent = store.getState().events[selectedEventID],
      coverPhoto = selectedEvent ? selectedEvent.coverPhoto : "",
      eventName = selectedEvent ? selectedEvent.name : "";
    return (
      <nav className={styles.sidebar}>
        <Link to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>

        <div className={styles.photoText}>
          <PhotoText imageURL={coverPhoto} text={eventName} />
        </div>

        <div className={styles.eventSelector}>
          <EventSelector
            selectedEventID={selectedEventID}
            events={this.props.events}
            handleEventSelection={this.handleEventSelection}
          />
        </div>

        <NavList {...this.props} />

        <div className={styles.newEventLink}>
          <Button leftIcon="calendar-plus" path="/events/new">
            Create New Event
          </Button>
        </div>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  events: PropTypes.object
};

export default Sidebar;
