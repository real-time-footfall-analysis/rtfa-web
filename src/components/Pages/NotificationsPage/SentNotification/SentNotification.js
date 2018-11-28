import React from "react";
import styles from "./SentNotification.module.scss";
import PropTypes from "prop-types";

export const SentNotification = props => {
  return (
    <article className={styles.notification}>
      <h3 className={styles.title}>
        <i className={`${styles.icon} far fa-bell`} />
        {props.title}
      </h3>
      <p className={styles.description}>{props.description}</p>
      <p className={styles.metadata}>{props.metadata}</p>
    </article>
  );
};

SentNotification.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  metadata: PropTypes.string
};
