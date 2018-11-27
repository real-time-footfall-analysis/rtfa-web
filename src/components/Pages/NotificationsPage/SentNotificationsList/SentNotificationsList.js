import React from "react";
import SentNotification from "../SentNotification/SentNotification";
import styles from "./SentNotificationsList.module.scss";

export const SentNotificationsList = () => {
  return (
    <section className={styles.list}>
      <SentNotification />
      <SentNotification />
      <SentNotification />
    </section>
  );
};
