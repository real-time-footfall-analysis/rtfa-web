import React from "react";
import PropTypes from "prop-types";

import Button from "../../../UI/Button/Button";
import styles from "./SendNotificationButton.module.scss";

export const SendNotificationButton = props => (
  <span className={styles.buttonWrapper}>
    <Button leftIcon="mobile" onClick={props.onClick}>
      Send New Notification
    </Button>
  </span>
);

SendNotificationButton.propTypes = {
  onClick: PropTypes.func
};
