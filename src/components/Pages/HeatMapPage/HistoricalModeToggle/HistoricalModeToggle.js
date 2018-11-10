import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./HistoricalModeToggle.module.scss";
import Toggle from "../../../UI/Toggle/Toggle";

export class HistoricalModeToggle extends Component {
  constructor(props) {
    super(props);
    /* Bind callback functions. */
    this.enableHistoricalMode = this.enableHistoricalMode.bind(this);
    this.disableHistoricalMode = this.disableHistoricalMode.bind(this);
  }

  enableHistoricalMode() {
    this.props.toggleHistoricalMode(this.props.selectedEventID, true);
  }

  disableHistoricalMode() {
    this.props.toggleHistoricalMode(this.props.selectedEventID, false);
  }

  static generateLabels() {
    return [
      <span key="live">
        <i className={`far fa-fire ${styles.icon} ${styles.fire}`} /> Live
      </span>,
      <span key="historical">
        <i className={`far fa-clock ${styles.icon}`} />
        Historical
      </span>
    ];
  }

  render() {
    return (
      <div className={styles.toggleWrapper}>
        <Toggle
          leftActive={!this.props.historicalModeEnabled}
          rightClicked={this.enableHistoricalMode}
          leftClicked={this.disableHistoricalMode}
        >
          {HistoricalModeToggle.generateLabels()}
        </Toggle>
      </div>
    );
  }
}

HistoricalModeToggle.propTypes = {
  historicalModeEnabled: PropTypes.bool,
  toggleHistoricalMode: PropTypes.func,
  selectedEventID: PropTypes.number
};
