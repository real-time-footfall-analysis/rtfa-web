import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import Logo from "../UI/Logo/Logo";
import NavList from "./NavList/NavList";
import EventSelector from "./EventSelector/EventSelector";
import PhotoText from "../UI/PhotoText/PhotoText";
import Button from "../UI/Button/Button";
import { EmergencyNotificationBell } from "./EmergencyNotificationBell/EmergencyNotificationBell";

class Sidebar extends Component {
  renderHeader() {
    return (
      <header className={styles.navHeader}>
        <Link to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>
        <EmergencyNotificationBell selectedEvent={this.props.selectedEvent} />
      </header>
    );
  }

  renderEventTitleImage() {
    const event = this.props.selectedEvent;
    const coverPhoto = event ? event.coverPhotoUrl : "";
    const eventName = event ? event.name : "";
    return (
      <div className={styles.photoText}>
        <PhotoText imageURL={coverPhoto} text={eventName} />
      </div>
    );
  }

  renderEventSelector() {
    return (
      <div className={styles.eventSelector}>
        <EventSelector
          selectedEventID={this.props.selectedEvent.eventID}
          events={this.props.events}
          handleEventSelection={this.props.handleEventSelection}
        />
      </div>
    );
  }

  renderNewEventLink() {
    return (
      <div className={styles.newEventLink}>
        <Button leftIcon="calendar-plus" path="/events/new">
          Create New Event
        </Button>
      </div>
    );
  }

  render() {
    return (
      <nav className={styles.sidebar}>
        {this.renderHeader()}
        {this.renderEventTitleImage()}
        {this.renderEventSelector()}
        <NavList {...this.props} />
        {this.renderNewEventLink()}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  events: PropTypes.object,
  selectedEvent: PropTypes.object
};

export default Sidebar;
