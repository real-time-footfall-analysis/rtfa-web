import React from "react";
import PropTypes from "prop-types";
import styles from "./KeyValueTask.module.scss";

export const KeyValueTask = props => {
  const roundedVal = Math.round(props.taskValue);
  return (
    <div>
      <h4 className={styles.taskName}>{props.taskName}</h4>
      <p className={styles.taskValue}>
        <span>{roundedVal ? roundedVal : "0"}</span>
        <span className={styles.units}>{props.taskUnits}</span>
      </p>
    </div>
  );
};

KeyValueTask.propTypes = {
  taskName: PropTypes.string,
  taskUnits: PropTypes.string,
  taskValue: PropTypes.any
};
