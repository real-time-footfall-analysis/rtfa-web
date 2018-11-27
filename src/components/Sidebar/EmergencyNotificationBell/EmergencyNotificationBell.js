import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NotificationBell } from "../../UI/NotificationBell/NotificationBell";
import { bindActionCreators } from "redux";
import { resolveEmergencyNotification } from "../../../actions/emergencyNotifications";

class EmergencyNotificationBell extends Component {
  constructor(props) {
    super(props);
    this.resolveNotification = this.resolveNotification.bind(this);
  }

  regionNotFound(functionName, regionID) {
    console.warn(
      `${functionName} in EmergencyNotificationBell.js couldn't find a region with ID ${regionID}`
    );
    console.warn(
      "The following regions were available when the error occurred: ",
      this.props.selectedEvent.regions
    );
  }

  getRegionName(regionIDs) {
    if (!regionIDs || regionIDs.length < 1) {
      return `Unknown Region`;
    }
    const relevantRegion = this.props.selectedEvent.regions[regionIDs[0]];
    if (!relevantRegion) {
      this.regionNotFound("getRegionName()", regionIDs[0]);
      return `Region ${regionIDs[0]}`;
    }
    return relevantRegion.name;
  }

  /* TODO: Refactor this to store a count in the Redux store. */
  getUnreadNotificationCount() {
    return this.props.selectedEvent.emergencyNotifications.reduce(
      (unreadCount, notification) =>
        notification.dealtWith ? unreadCount : unreadCount + 1,
      0
    );
  }

  processNotifications() {
    return this.props.selectedEvent.emergencyNotifications.map(
      notification => ({
        icon: "warning-sign",
        title: (
          <span>
            <strong>Emergency</strong> at
            {` ${this.getRegionName(notification.regionIds)}`}
          </span>
        ),
        timestamp: notification.occurredAt,
        notificationID: notification.uuid + "|" + notification.occurredAt,
        resolved: notification.dealtWith
      })
    );
  }

  getIDComponents(notificationID) {
    const splitID = notificationID.split("|");
    return {
      uuid: splitID[0],
      occurredAt: parseInt(splitID[1])
    };
  }

  resolveNotification(notification) {
    const { uuid, occurredAt } = this.getIDComponents(
      notification.notificationID
    );
    const originalNotification = this.props.selectedEvent.emergencyNotifications.filter(
      n => n.occurredAt === occurredAt && n.uuid === uuid
    )[0];
    this.props.onResolve(originalNotification);
  }

  render() {
    if (
      !this.props.selectedEvent ||
      !this.props.selectedEvent.emergencyNotifications
    ) {
      return null;
    }
    return (
      <NotificationBell
        notifications={this.processNotifications()}
        unreadNotificationCount={this.getUnreadNotificationCount()}
        onResolve={this.resolveNotification}
      />
    );
  }
}

EmergencyNotificationBell.propTypes = {
  selectedEvent: PropTypes.object,
  onResolve: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onResolve: resolveEmergencyNotification
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(EmergencyNotificationBell);
