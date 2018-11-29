import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import TaskTitle from "../../../../../UI/TaskTitle/TaskTitle";
import { timestampToTimeString } from "../../../../../../utils";
import * as PropTypes from "prop-types";

class PopularTimesTask extends Component {
  static propTypes = {
    taskValue: PropTypes.object
  };

  /* @returns ChartJS options object for bar chart formatting, including
   *          color properties, bar thickness etc. */
  getBarOptions() {
    return {
      borderWidth: 0,
      barThickness: "flex",
      backgroundColor: "#514abf",
      hoverBackgroundColor: "#696bf0"
    };
  }

  /* @param timestamps An array of raw UNIX timestamps.
   * @returns An array of time strings in the format "HH:MM". */
  formatTimestamps(timestamps) {
    return timestamps.map(timestampToTimeString);
  }

  /* @param timestamps An array of raw UNIX timestamps.
   * @returns An array of population values. Item at index `n` corresponds to
   *         the timestamp at index `n` in the argument array. */
  getPopulationValues(timestamps) {
    return timestamps.map(t => this.props.taskValue[t]);
  }

  /* @returns An object containing an array of formatted timestamp strings and
              an array of population values, with items in both arrays
              corresponding based on index. */
  getData() {
    const timestamps = Object.keys(this.props.taskValue);
    return {
      timestamps: this.formatTimestamps(timestamps),
      populationValues: this.getPopulationValues(timestamps)
    };
  }

  /* @returns A ChartJS configuration object to render a bar chart based on the
   *          data passed into this component.
   *          Returns null if no data exists in props.taskValue */
  formatData() {
    if (!this.props.taskValue) {
      return null;
    }
    const data = this.getData();
    return {
      labels: data.timestamps,
      datasets: [
        {
          ...this.getBarOptions(),
          data: data.populationValues
        }
      ]
    };
  }

  render() {
    const data = this.formatData();
    if (!data) {
      return null;
    }
    return (
      <div>
        <TaskTitle name="Popular Times" icon="signal" />
        <Bar
          data={data}
          width={300}
          height={200}
          options={{
            legend: { display: false },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default PopularTimesTask;
