import React, { Component } from "react";
import PropTypes from "prop-types";
import { NotificationBell } from "../../UI/NotificationBell/NotificationBell";

export class EmergencyNotificationBell extends Component {
  getRegionName(regionIDs) {
    if (!regionIDs) {
      return `Unknown Region`;
    }
    const relevantRegion = this.props.selectedEvent.regions[regionIDs[0]];
    return relevantRegion.name;
  }

  /* TODO: Refactor this to store a count in the Redux store. */
  getUnreadNotificationCount() {
    return this.props.selectedEvent.notifications.reduce(
      (unreadCount, notification) =>
        notification.dealtWith ? unreadCount : unreadCount + 1,
      0
    );
  }

  processNotifications() {
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
    if (!this.props.selectedEvent || !this.props.selectedEvent.notifications) {
      return null;
    }
    return (
      <NotificationBell
        notifications={this.processNotifications()}
        unreadNotificationCount={this.getUnreadNotificationCount()}
      />
    );
  }
}

EmergencyNotificationBell.propTypes = {
  selectedEvent: PropTypes.object
};
