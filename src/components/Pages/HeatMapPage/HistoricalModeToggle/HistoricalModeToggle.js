import React from "react";
import PropTypes from "prop-types";
import styles from "./HistoricalModeToggle.scss";
import Toggle from "../../../UI/Toggle/Toggle";

export const HistoricalModeToggle = props => {
  return (
    <div className={styles.toggleWrapper}>
      <Toggle
        leftActive={!props.historicalModeEnabled}
        rightClicked={props.enableHistoricalMode}
        leftClicked={props.disableHistoricalMode}
      >
        <span>
          <i className={`far fa-fire ${styles.icon}`} /> Live
        </span>
        <span>
          <i className={`far fa-clock ${styles.icon}`} />
          Historical
        </span>
      </Toggle>
    </div>
  );
};

HistoricalModeToggle.propTypes = {
  historicalModeEnabled: PropTypes.bool,
  enableHistoricalMode: PropTypes.func,
  disableHistoricalMode: PropTypes.func
};
