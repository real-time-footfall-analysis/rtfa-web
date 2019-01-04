import React from "react";
import * as PropTypes from "prop-types";
import styles from "./NonIdealState.module.scss";

const NonIdealState = props => {
  return (
    <div className={styles.wrapper}>
      <i className={`${props.icon} ${styles.icon}`} />
      <h3 className={`${styles.title}`}>{props.title}</h3>
      <p className={`${styles.description}`}>{props.description}</p>
    </div>
  );
};

NonIdealState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default NonIdealState;
