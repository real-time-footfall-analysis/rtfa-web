import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
import { SendNotificationButton } from "./SendNotificationButton/SendNotificationButton";
import { SendNotificationFormOverlay } from "./SendNotificationFormOverlay/SendNotificationFormOverlay";

class NotificationsPage extends Component {
  static propTypes = {
    selectedEventID: PropTypes.number,
    loadSentNotifications: PropTypes.func,
    notifications: PropTypes.array,
    regions: PropTypes.object,
    sendNotification: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
  }

  componentDidMount() {
    this.fetchNotificationsIfNeeded();
  }

  componentDidUpdate() {
    this.fetchNotificationsIfNeeded();
  }

  render() {
    const { selectedEventID, regions } = this.props;
    return (
      <Page title={<span>Notifications</span>}>
        <SentNotificationsList notifications={this.processNotifications()} />
        <SendNotificationButton onClick={this.toggleNewNotificationForm} />
        <SendNotificationFormOverlay
          selectedEventID={selectedEventID}
          regions={regions}
          onClose={this.toggleNewNotificationForm}
          onSubmit={this.handleFormSubmit}
          visible={this.state.formVisible}
        />
      </Page>
    );
  }

  /* Toggles whether the new notification form is visible or not. */
  toggleNewNotificationForm = () => {
    this.setState(prevState => ({
      formVisible: !prevState.formVisible
    }));
  };

  /* Hides the form overlay and sends the new notification to the API for
   * delivery to phones. */
  handleFormSubmit = (...args) => {
    this.toggleNewNotificationForm();
    this.props.sendNotification(...args);
  };

  /* Calls the action creator for loading sent notifications if
   * an event has been selected (i.e. events have been loaded) and
   * the notifications haven't already been loaded. */
  fetchNotificationsIfNeeded() {
    let { selectedEventID, notifications, loadSentNotifications } = this.props;
    if (selectedEventID !== -1 && !notifications) {
      loadSentNotifications(selectedEventID);
    }
  }

  /* Simplifies API notification objects into only what is needed for render. */
  processNotifications() {
    const { notifications } = this.props;
    if (!notifications) {
      return [];
    }
    return notifications.map(notification => ({
      title: notification.title,
      description: notification.description,
      metadata: this.generateMetadataString(notification),
      notificationID: notification.notificationId
    }));
  }

  /* Generates a metadata string for the given notification, in the format:
   * "Sent to Main Stage, Campsite Bar @ 21:16 on Tuesday, 27 November 2018". */
  generateMetadataString(notification) {
    const { regions } = this.props;
    const regionNames = notification.regionIds.map(regionID =>
      regions[regionID] ? regions[regionID].name : `Region ${regionID}`
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

const mapDispatchToProps = {
  loadSentNotifications,
  sendNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
