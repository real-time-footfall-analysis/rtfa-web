import React from "react";
import * as PropTypes from "prop-types";
import styles from "./TaskTitle.module.scss";

const TaskTitle = props => (
  <h4 className={styles.taskName}>
    <i className={`far fa-${props.icon} ${styles.icon}`} />
    {props.name}
  </h4>
);

TaskTitle.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string
};

export default TaskTitle;
