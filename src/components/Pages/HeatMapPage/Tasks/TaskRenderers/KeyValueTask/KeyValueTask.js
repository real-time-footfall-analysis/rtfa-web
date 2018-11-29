import React from "react";
import PropTypes from "prop-types";
import styles from "./KeyValueTask.module.scss";
import TaskTitle from "../../../../../UI/TaskTitle/TaskTitle";

export const KeyValueTask = props => {
  const roundedVal = Math.round(props.taskValue);
  return (
    <div className={styles.task}>
      <TaskTitle icon={props.taskIcon} name={props.taskName} />
      <p className={styles.taskValue}>
        <span>{roundedVal ? roundedVal : "0"}</span>
        <span className={styles.units}>{props.taskUnits}</span>
      </p>
      {props.children}
    </div>
  );
};

KeyValueTask.propTypes = {
  taskName: PropTypes.string,
  taskUnits: PropTypes.string,
  taskValue: PropTypes.any,
  taskIcon: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};
