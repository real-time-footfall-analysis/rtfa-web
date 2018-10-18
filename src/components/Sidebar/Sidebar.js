import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";
import EventSelector from "./EventSelector/EventSelector";
import PhotoText from "../UI/PhotoText/PhotoText";
import Button from "../UI/Button/Button";

class Sidebar extends Component {
  render() {
    const coverPhoto = this.props.selectedEvent
        ? this.props.selectedEvent.coverPhoto
        : "",
      eventName = this.props.selectedEvent ? this.props.selectedEvent.name : "";
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
            selectedEventID={this.props.selectedEvent.eventID}
            events={this.props.events}
            handleEventSelection={this.props.handleEventSelection}
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
