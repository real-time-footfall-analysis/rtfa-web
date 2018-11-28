import React, { Component } from "react";
import Page from "../../UI/Page/Page";
import { SentNotificationsList } from "./SentNotificationsList/SentNotificationsList";
import { getRegions, getSelectedEvent } from "../../../selectors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadSentNotifications } from "../../../actions/notifications";
import PropTypes from "prop-types";
import {
  timestampToLongDateString,
  timestampToTimeString
} from "../../../utils";
import { MILLISECONDS_IN_A_SECOND } from "../../../constants";
import SendNotificationForm from "./SendNotificationForm/SendNotificationForm";

class NotificationsPage extends Component {
  static propTypes = {
    selectedEventID: PropTypes.number,
    loadSentNotifications: PropTypes.func,
    notifications: PropTypes.array,
    regions: PropTypes.object
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
        <SendNotificationForm regions={this.props.regions} />
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
    const regionNames = notification.regionIds.map(
      regionID => this.props.regions[regionID].name
    );
    const formattedRegionNames = regionNames.join(", ");
    const timestamp = notification.occurredAt * MILLISECONDS_IN_A_SECOND;
    const timeString = timestampToTimeString(timestamp);
    const dateString = timestampToLongDateString(timestamp);
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
      loadSentNotifications: loadSentNotifications
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
