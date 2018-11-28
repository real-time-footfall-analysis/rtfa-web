import React from "react";
import { SentNotification } from "../SentNotification/SentNotification";
import styles from "./SentNotificationsList.module.scss";
import PropTypes from "prop-types";

export const SentNotificationsList = props => {
  return (
    <section className={styles.list}>
      {props.notifications.map(notification => (
        <SentNotification
          title={notification.title}
          description={notification.description}
          metadata={notification.metadata}
          key={notification.notificationID}
        />
      ))}
    </section>
  );
};

SentNotificationsList.propTypes = {
  notifications: PropTypes.array
};
