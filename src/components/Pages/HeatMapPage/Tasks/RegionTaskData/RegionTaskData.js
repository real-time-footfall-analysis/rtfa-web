import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NonIdealState from "../../../../UI/NonIdealState/NonIdealState";
import _ from "lodash";

import { getSelectedEvent } from "../../../../../selectors";
import { renderTask } from "../TaskRenderers";
import styles from "./RegionTaskData.module.scss";

export class RegionTaskData extends Component {
  loadingMessage() {
    return (
      <h2 className={styles.loadingMessage}>
        <i className={`${styles.spinner} fas fa-spinner fa-spin`} />
        Loading task data...
      </h2>
    );
  }

  getTaskComponents() {
    const taskComponents = this.props.tasksData.map(task =>
      renderTask(task, this.props.region.regionID)
    );
    if (taskComponents.every(_.isNull)) {
      return (
        <NonIdealState
          title="No analytics found!"
          description="Sorry about that."
          icon="fal fa-analytics"
        />
      );
    }
    return taskComponents;
  }

  emptyTasks(tasks) {
    return tasks.constructor !== Array;
  }

  render() {
    if (!this.props.tasksData) {
      return this.loadingMessage();
    }
    const tasks = this.getTaskComponents();
    return (
      <div className={styles.taskForm}>
        <h1 className={styles.regionName}>{this.props.region.name}</h1>
        <section
          className={`${styles.tasks}
                      ${this.emptyTasks(tasks) ? styles.noTasks : ""}`}
        >
          {tasks}
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
