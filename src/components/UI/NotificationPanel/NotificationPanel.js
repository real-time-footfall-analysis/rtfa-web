import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./NotificationPanel.module.scss";
import { Icon } from "@blueprintjs/core";
import { timestampToLongDateString } from "../../../utils";

export class NotificationPanel extends Component {
  formatTimestamp(timestamp) {
    return timestampToLongDateString(timestamp);
  }

  render() {
    return (
      <ul className={styles.panel}>
        {this.props.notifications.map(notification => (
          <li className={styles.notification} key={notification.notificationID}>
            <Icon icon={notification.icon} iconSize={20} />
            <div className={styles.content}>
              <h3 className={styles.title}>{notification.title}</h3>
              <p className={styles.timestamp}>
                {this.formatTimestamp(notification.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

NotificationPanel.propTypes = {
  notifications: PropTypes.array
};
