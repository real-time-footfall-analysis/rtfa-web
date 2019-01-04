import React from "react";
import PropTypes from "prop-types";
import { KeyValueTask } from "../KeyValueTask/KeyValueTask";
import styles from "./BounceRateTask.module.scss";
import { decimalToPercentage } from "../../../../../../utils";

export const BounceRateTask = props => {
  if (!props.taskValue || !props.taskValue.bounceRate) {
    return null;
  }
  const formattedBounceRate = decimalToPercentage(props.taskValue.bounceRate);
  return (
    <KeyValueTask {...props} taskValue={formattedBounceRate}>
      <p className={styles.threshold}>
        of people left within {props.taskValue.threshold / 60}{" "}
        {props.thresholdUnits}
      </p>
    </KeyValueTask>
  );
};

BounceRateTask.propTypes = {
  taskName: PropTypes.string,
  taskUnits: PropTypes.string,
  taskValue: PropTypes.any,
  taskIcon: PropTypes.string,
  thresholdUnits: PropTypes.string
};
