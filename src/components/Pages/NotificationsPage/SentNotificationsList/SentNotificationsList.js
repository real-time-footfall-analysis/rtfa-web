import React from "react";
import { SentNotification } from "../SentNotification/SentNotification";
import styles from "./SentNotificationsList.module.scss";
import PropTypes from "prop-types";
import NonIdealState from "../../../UI/NonIdealState/NonIdealState";

export const SentNotificationsList = props => {
  if (!props.notifications || props.notifications.length === 0) {
    return <NoNotifications />;
  }
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

const NoNotifications = () => (
  <NonIdealState
    icon="far fa-bell-slash"
    title="No notifications sent yet!"
    description="Send your first using the form below."
    alignLeft={true}
  />
);
