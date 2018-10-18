import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "@blueprintjs/core";
import Page from "../Page/Page";
import styles from "./EventsPage.module.scss";
import _ from "lodash";
import { connect } from "react-redux";

class EventsPage extends Component {
  generateImage(eventName) {
    const salt = Math.floor(Math.random() * (1000 + 1));
    return (
      <img
        src={`https://source.unsplash.com/600x400/?concert,gig,crowd,music,${salt}`}
        alt={eventName}
      />
    );
  }

  generateCardTitle(eventName) {
    return (
      <h3 className={styles.eventName}>
        <a href="#example" className={styles.eventLink}>
          {eventName}
        </a>
      </h3>
    );
  }

  generateLocation(eventLocation) {
    return <p className={styles.eventLocation}>{eventLocation}</p>;
  }

  generateEventCard(event) {
    const image = this.generateImage(event.name);
    const title = this.generateCardTitle(event.name);
    const location = this.generateLocation(event.location);
    return (
      <Card
        key={event.eventID}
        className={`${styles.eventCard} .bp3-skeleton`}
        interactive={true}
        elevation={1}
      >
        {image}
        {title}
        {location}
      </Card>
    );
  }

  generatePageTitle(pageName) {
    return (
      <div>
        <div className={styles.pageTitle}>{pageName}</div>
      </div>
    );
  }

  render() {
    const events = _.map(this.props.events, event =>
      this.generateEventCard(event)
    );
    return (
      <Page title={this.generatePageTitle(this.props.name)}>
        <div className={styles.eventsWrapper}>{events}</div>
      </Page>
    );
  }
}

EventsPage.propTypes = {
  name: PropTypes.string,
  events: PropTypes.object
};

export default connect(state => ({ events: state.events }))(EventsPage);
