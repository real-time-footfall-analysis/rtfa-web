import React, { Component } from "react";
import PropTypes from "prop-types";
import { NotificationBell } from "../../UI/NotificationBell/NotificationBell";

export class EmergencyNotificationBell extends Component {
  getRegionName(regionIDs) {
    if (!regionIDs) {
      return `Unknown Region`;
    } else if (!this.props.selectedEvent || !this.props.selectedEvent.regions) {
      return `Region ${regionIDs[0]}`;
    }
    const relevantRegion = this.props.selectedEvent.regions[regionIDs[0]];
    return relevantRegion.name;
  }

  processNotifications() {
    if (!this.props.selectedEvent.notifications) {
      return [];
    }
    return this.props.selectedEvent.notifications.map(notification => ({
      icon: "warning-sign",
      title: (
        <span>
          <strong>Emergency</strong> at
          {` ${this.getRegionName(notification.regionIds)}`}
        </span>
      ),
      timestamp: notification.occurredAt,
      notificationID: notification.uuid + notification.timestamp,
      resolved: notification.dealtWith
    }));
  }
  render() {
    return <NotificationBell notifications={this.processNotifications()} />;
  }
}

EmergencyNotificationBell.propTypes = {
  notifications: PropTypes.array,
  selectedEvent: PropTypes.object
};
