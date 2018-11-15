import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popover } from "@blueprintjs/core";

import styles from "./NotificationBell.module.scss";
import { NotificationPanel } from "../NotificationPanel/NotificationPanel";

export class NotificationBell extends Component {
  generateBellIcon() {
    return (
      <div className={styles.bell}>{this.props.unreadNotificationCount}</div>
    );
  }

  generateNotificationPanel() {
    return <NotificationPanel notifications={this.props.notifications} />;
  }

  render() {
    return (
      <Popover
        content={this.generateNotificationPanel()}
        target={this.generateBellIcon()}
        position="bottom"
      />
    );
  }
}

NotificationBell.defaultProps = {
  unreadNotificationCount: 0,
  notifications: [
    {
      icon: "warning-sign",
      title: (
        <span>
          <strong>Emergency </strong> at <strong>Campsite Bar</strong>
        </span>
      ),
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "1542304881",
      resolved: false
    },
    {
      icon: "warning-sign",
      title: (
        <span>
          <strong>Emergency </strong> at <strong>Main Stage</strong>
        </span>
      ),
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "1542300000",
      resolved: true
    },
    {
      icon: "warning-sign",
      title: (
        <span>
          <strong>Emergency </strong> at <strong>Toilets</strong>
        </span>
      ),
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "1542201341",
      resolved: true
    },
    {
      icon: "warning-sign",
      title: (
        <span>
          <strong>Emergency </strong> at <strong>Burger Stand</strong>
        </span>
      ),
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "1542101971",
      resolved: true
    }
  ]
};

NotificationBell.propTypes = {
  unreadNotificationCount: PropTypes.number,
  notifications: PropTypes.array
};
