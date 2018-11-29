import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Page from "../../UI/Page/Page";
import { getRegions, getSelectedEvent } from "../../../selectors";
import {
  loadSentNotifications,
  sendNotification
} from "../../../actions/notifications";
import {
  timestampToShortDateString,
  timestampToTimeString
} from "../../../utils";
import { SentNotificationsList } from "./SentNotificationsList/SentNotificationsList";
import SendNotificationForm from "./SendNotificationForm/SendNotificationForm";

class NotificationsPage extends Component {
  static propTypes = {
    selectedEventID: PropTypes.number,
    loadSentNotifications: PropTypes.func,
    notifications: PropTypes.array,
    regions: PropTypes.object,
    sendNotification: PropTypes.func
  };

  componentDidMount() {
    this.fetchNotificationsIfNeeded();
  }

  componentDidUpdate() {
    this.fetchNotificationsIfNeeded();
  }

  render() {
    return (
      <Page title={<span>Notifications</span>}>
        <SentNotificationsList notifications={this.processNotifications()} />
        <SendNotificationForm
          eventID={this.props.selectedEventID}
          regions={this.props.regions}
          sendNotification={this.props.sendNotification}
        />
      </Page>
    );
  }

  /* Calls the action creator for loading sent notifications if
   * an event has been selected (i.e. events have been loaded) and
   * the notifications haven't already been loaded. */
  fetchNotificationsIfNeeded() {
    if (this.props.selectedEventID !== -1 && !this.props.notifications) {
      this.props.loadSentNotifications(this.props.selectedEventID);
    }
  }

  /* Simplifies API notification objects into only what is needed for render. */
  processNotifications() {
    if (!this.props.notifications) {
      return [];
    }
    return this.props.notifications.map(notification => ({
      title: notification.title,
      description: notification.description,
      metadata: this.generateMetadataString(notification),
      notificationID: notification.notificationId
    }));
  }

  /* Generates a metadata string for the given notification, in the format:
   * "Sent to Main Stage, Campsite Bar @ 21:16 on Tuesday, 27 November 2018". */
  generateMetadataString(notification) {
    const regionNames = notification.regionIds.map(regionID =>
      this.props.regions[regionID]
        ? this.props.regions[regionID].name
        : `Region ${regionID}`
    );
    const formattedRegionNames = regionNames.join(", ");
    const timestamp = notification.occurredAt;
    const timeString = timestampToTimeString(timestamp);
    const dateString = timestampToShortDateString(timestamp);
    return `Sent to ${formattedRegionNames} @ ${timeString} on ${dateString}`;
  }
}

const mapStateToProps = state => ({
  selectedEventID: state.selectedEventID,
  regions: getRegions(state),
  notifications: getSelectedEvent(state).sentNotifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadSentNotifications: loadSentNotifications,
      sendNotification: sendNotification
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
