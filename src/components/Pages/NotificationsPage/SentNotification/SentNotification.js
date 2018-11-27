import React from "react";
import styles from "./SentNotification.module.scss";

const SentNotification = () => {
  return (
    <article className={styles.notification}>
      <h3 className={styles.title}>
        <i className={`${styles.icon} far fa-bell`} />
        Discount at Campsite Bar!
      </h3>
      <p className={styles.description}>
        Quote 25POFF to bar staff for 25% off drinks.
      </p>
      <p className={styles.metadata}>
        Sent to Arena Bar, Campsite @ 12:43pm on Weds 21st June
      </p>
    </article>
  );
};

export default SentNotification;
