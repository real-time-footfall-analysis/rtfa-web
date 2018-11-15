import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./NotificationPanel.module.scss";
import { Icon } from "@blueprintjs/core";
import { timestampToLongDateString } from "../../../utils";
import Button from "../Button/Button";

export class NotificationPanel extends Component {
  constructor(props) {
    super(props);
    this.renderNotification = this.renderNotification.bind(this);
  }

  formatTimestamp(timestamp) {
    return timestampToLongDateString(timestamp);
  }

  generateResolveButton() {
    return (
      <Button
        className={styles.resolveButton}
        fill={false}
        leftIcon="check-circle"
        onClick={() => console.warn("Resolve button click handler!")}
      >
        Resolve
      </Button>
    );
  }

  renderNotification(notification) {
    return (
      <li className={styles.notification} key={notification.notificationID}>
        <Icon icon={notification.icon} iconSize={20} />
        <div className={styles.content}>
          <h3 className={styles.title}>{notification.title}</h3>
          <p className={styles.timestamp}>
            {this.formatTimestamp(notification.timestamp)}
          </p>
          {!notification.resolved ? this.generateResolveButton() : null}
        </div>
      </li>
    );
  }

  render() {
    return (
      <ul className={styles.panel}>
        {this.props.notifications.map(this.renderNotification)}
      </ul>
    );
  }
}

NotificationPanel.propTypes = {
  notifications: PropTypes.array
};
