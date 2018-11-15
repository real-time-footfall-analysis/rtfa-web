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
      icon: "warning-bell",
      message: "Emergency: user in region 10 needs help!",
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "154228450339"
    },
    {
      icon: "warning-bell",
      message: "Emergency: user in region 20 needs help!",
      notificationID: "032d7856-e8d1-11e8-bb9b-4c34884325d3-154228450339",
      timestamp: "154228440135"
    }
  ]
};

NotificationBell.propTypes = {
  unreadNotificationCount: PropTypes.number,
  notifications: PropTypes.array
};
