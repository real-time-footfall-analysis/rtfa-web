import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./NotificationPanel.module.scss";

export class NotificationPanel extends Component {
  formatTimestamp(timestamp) {
    return timestamp;
  }

  render() {
    return (
      <ul className={styles.panel}>
        {this.props.notifications.map(notification => (
          <li className={styles.notification} key={notification.notificationID}>
            <p className={styles.message}>{notification.message}</p>
            <p>Time: {this.formatTimestamp(notification.timestamp)}</p>
          </li>
        ))}
      </ul>
    );
  }
}

NotificationPanel.propTypes = {
  notifications: PropTypes.array
};
