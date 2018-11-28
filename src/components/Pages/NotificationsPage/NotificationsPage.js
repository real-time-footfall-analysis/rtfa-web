import React, { Component } from "react";
import Page from "../../UI/Page/Page";
import { SentNotificationsList } from "./SentNotificationsList/SentNotificationsList";
import { getSelectedEvent } from "../../../selectors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadSentNotifications } from "../../../actions/notifications";
import PropTypes from "prop-types";
import {
  timestampToLongDateString,
  timestampToTimeString
} from "../../../utils";
import { MILLISECONDS_IN_A_SECOND } from "../../../constants";

class NotificationsPage extends Component {
  static propTypes = {
    selectedEventID: PropTypes.number,
    loadSentNotifications: PropTypes.func,
    notifications: PropTypes.array,
    regions: PropTypes.object
  };

  componentDidUpdate() {
    /* Fetch sentNotifications if needed. */
    if (this.props.selectedEventID !== -1 && !this.props.notifications) {
      this.props.loadSentNotifications(this.props.selectedEventID);
    }
  }

  render() {
    return (
      <Page title={<span>Notifications</span>}>
        <SentNotificationsList notifications={this.processNotifications()} />
      </Page>
    );
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
  regions: getSelectedEvent(state).regions,
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
