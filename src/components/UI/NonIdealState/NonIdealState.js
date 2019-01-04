import React from "react";
import * as PropTypes from "prop-types";
import styles from "./NonIdealState.module.scss";

const NonIdealState = props => {
  return (
    <div
      className={`${styles.wrapper} ${props.alignLeft ? styles.alignLeft : ""}`}
    >
      <i className={`${props.icon} ${styles.icon}`} />
      <h3 className={`${styles.title}`}>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};

NonIdealState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  alignLeft: PropTypes.bool
};

export default NonIdealState;
