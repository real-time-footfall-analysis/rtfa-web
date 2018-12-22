import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./RegionTaskData.module.scss";
import { connect } from "react-redux";
import { getSelectedEvent } from "../../../../../selectors";
import { renderTask } from "../TaskRenderers";

export class RegionTaskData extends Component {
  loadingMessage() {
    return (
      <h2 className={styles.loadingMessage}>
        <i className={`${styles.spinner} fas fa-spinner fa-spin`} />
        Loading task data...
      </h2>
    );
  }
  render() {
    if (!this.props.tasksData) {
      return this.loadingMessage();
    }
    return (
      <div className={styles.taskForm}>
        <h1 className={styles.regionName}>{this.props.region.name}</h1>
        <section className={styles.tasks}>
          {this.props.tasksData.map(task =>
            renderTask(task, this.props.region.regionID)
          )}
        </section>
      </div>
    );
  }
}

RegionTaskData.propTypes = {
  region: PropTypes.object,
  onClose: PropTypes.func,
  selectedEvent: PropTypes.object,
  tasksData: PropTypes.array
};

export default connect(
  state => ({ selectedEvent: getSelectedEvent(state) }),
  null
)(RegionTaskData);
