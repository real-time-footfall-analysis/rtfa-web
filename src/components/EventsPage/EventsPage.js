import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "@blueprintjs/core";
import Page from "../Page/Page";
import styles from "./EventsPage.module.scss";
import store from "../../store";
import _ from "lodash";

export class EventsPage extends Component {
  /* TODO: Replace this to integrate with back-end */
  fetchEvents() {
    return store.getState().events;
  }

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
    const eventData = this.fetchEvents();
    const events = _.map(eventData, event => this.generateEventCard(event));
    return (
      <Page title={this.generatePageTitle(this.props.name)}>
        <div className={styles.eventsWrapper}>{events}</div>
      </Page>
    );
  }
}

EventsPage.propTypes = {
  name: PropTypes.string
};
