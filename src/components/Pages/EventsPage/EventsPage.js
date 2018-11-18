import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "@blueprintjs/core";
import Page from "../../UI/Page/Page";
import styles from "./EventsPage.module.scss";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectEvent } from "../../../actions";

class EventsPage extends Component {
  generateImage(eventName, coverPhotoUrl) {
    return <img src={coverPhotoUrl} alt={eventName} />;
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
    const image = this.generateImage(event.name, event.coverPhotoUrl);
    const title = this.generateCardTitle(event.name);
    const location = this.generateLocation(event.location);
    return (
      <Card
        key={event.eventID}
        className={`${styles.eventCard} .bp3-skeleton`}
        interactive={true}
        elevation={1}
        onClick={() => {
          this.props.handleEventSelection(event.eventID);
        }}
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
  events: PropTypes.object,
  handleEventSelection: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleEventSelection: selectEvent
    },
    dispatch
  );
};

export default connect(
  state => ({ events: state.events }),
  mapDispatchToProps
)(EventsPage);
