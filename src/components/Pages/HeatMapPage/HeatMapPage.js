import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import _ from "lodash";

import {
  GOOGLE_MAPS_URL,
  HEATMAP_ANIMATION_FRAME_DELAY,
  HEATMAP_REFRESH_INTERVAL,
  REGION_CATEGORIES
} from "../../../constants";
import {
  loadHeatMap,
  loadHistoricalHeatMap,
  loadTasksData,
  setHeatMapHistoricalMode,
  setHeatMapSliderValue
} from "../../../actions";
import { getRegions, getSelectedEvent } from "../../../selectors";
import { sleep, timestampToTimeString } from "../../../utils";

import Button from "../../UI/Button/Button";
import Page from "../../UI/Page/Page";
import { TimeSelector } from "../../UI/TimeSelector/TimeSelector";

import HeatMap from "./HeatMap/HeatMap";
import { HistoricalModeToggle } from "./HistoricalModeToggle/HistoricalModeToggle";

import styles from "./HeatMapPage.module.scss";

class HeatMapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    /* Bind callbacks. */
    this.timeSelectLabelRenderer = this.timeSelectLabelRenderer.bind(this);
    this.onTimeSelection = this.onTimeSelection.bind(this);
    this.historicalModeChange = this.historicalModeChange.bind(this);
    this.playHeatMap = this.playHeatMap.bind(this);
  }

  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        <div className={styles.heatMapPage}>
          {this.generateHistoricalToggle()}
          {this.generateIconKey()}
          <div className={styles.content}>
            {this.generateMapElement()}
            {this.generateHistoricalTools()}
          </div>
        </div>
      </Page>
    );
  }

  componentDidMount() {
    this.props.loadHeatMap(this.props.selectedEventID);
    this.props.loadTasksData(this.props.selectedEventID);
    this.props.loadHistoricalHeatMap(this.props.selectedEventID);
    /* Poll for live heat map data every N seconds. */
    this.enableDataPolling();
  }

  componentDidUpdate() {
    if (!this.props.historicalHeatMapData) {
      this.props.loadHistoricalHeatMap(this.props.selectedEventID);
    }
    if (!this.props.liveHeatMapData) {
      this.props.loadHeatMap(this.props.selectedEventID);
    }
    if (!this.props.tasksData) {
      this.props.loadTasksData(this.props.selectedEventID);
    }
  }

  componentWillUnmount() {
    /* Stop polling for live heatmap data. */
    clearInterval(this.dataFetcher);
  }

  generateMapElement() {
    const mapContainer = (
      <div
        className={`${styles.mapContainer} ${
          this.shouldDisableHistoricalTools() ? styles.disabled : ""
        }`}
      />
    );
    return (
      <HeatMap
        googleMapURL={GOOGLE_MAPS_URL}
        loadingElement={<div />}
        containerElement={mapContainer}
        mapElement={<div className={styles.mapElement} />}
        regions={this.props.regions}
        heatMapData={this.selectHeatMapData()}
        historicalMode={this.props.historicalModeEnabled}
        tasksData={this.props.tasksData}
      />
    );
  }

  /* Returns the last-seen live heat map data, or the historical heat map data
   * if historicalModeEnabled is true.
   *
   * @returns A heat map data object of the form { regionID: count }
   */
  selectHeatMapData = () => {
    if (this.props.historicalModeEnabled) {
      const histData = this.props.historicalHeatMapData;
      if (!histData || !histData.timestamps) {
        return {};
      }
      const timestamp = histData.timestamps[this.props.sliderValue];
      return histData.data[timestamp];
    } else {
      return this.props.liveHeatMapData;
    }
  };

  /* Creates the historical view toolbar, containing the TimeSelector and
   * play button. */
  generateHistoricalTools() {
    if (!this.shouldDisplayHistoricalTools()) {
      return;
    }
    return (
      <div className={styles.tools}>
        <div className={styles.timeSelectorWrapper}>
          {this.generateTimeSelector()}
        </div>
        <Button
          disabled={this.shouldDisableHistoricalTools() || this.state.playing}
          className={styles.playButton}
          onClick={this.playHeatMap}
        >
          <i className="far fa-play-circle" />
        </Button>
      </div>
    );
  }

  /* Loops through available timestamps and displays the heatmap at each one,
   * for X seconds before moving to the next point in time. */
  async playHeatMap() {
    this.setState({
      playing: true
    });
    const datapoints = _.size(this.props.historicalHeatMapData.data);
    for (let index = 0; index < datapoints; index++) {
      this.onTimeSelection(index);
      await sleep(HEATMAP_ANIMATION_FRAME_DELAY);
    }
    this.setState({
      playing: false
    });
  }

  /* Returns a popover target that will display the icon-category key when
   * clicked. */
  generateIconKey() {
    /* Remove the "Uncategorised" category */
    const categories = _.pickBy(
      REGION_CATEGORIES,
      (value, key) => parseInt(key) !== 0
    );
    return (
      <section className={styles.iconKeyWrapper}>
        <ul>
          {_.map(categories, (category, index) => (
            <li className={styles.keyEntry} key={index}>
              <i className={styles.keyIcon}>{category.icon}</i>
              {category.category}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  /* Creates a toggle allowing you to select "Live" and "Historical" views. */
  generateHistoricalToggle() {
    const historicalData = this.props.historicalHeatMapData;
    if (!historicalData) {
      return null;
    }
    return (
      <HistoricalModeToggle
        historicalModeEnabled={this.props.historicalModeEnabled}
        toggleHistoricalMode={this.historicalModeChange}
        selectedEventID={this.props.selectedEventID}
        disabled={this.state.playing}
      />
    );
  }

  /* Refreshes live data from the backend every few seconds. */
  enableDataPolling() {
    this.dataFetcher = setInterval(
      () => this.props.loadHeatMap(this.props.selectedEventID),
      HEATMAP_REFRESH_INTERVAL
    );
  }

  /* Stops fetching live data (prevents historical view data from being
   * overwritten). */
  disableDataPolling() {
    clearInterval(this.dataFetcher);
  }

  /* Toggles data polling as needed and then dispatches a Redux action to toggle
   * the historical mode property in the store. */
  historicalModeChange(eventID, historicalModeEnabled) {
    if (historicalModeEnabled) {
      this.disableDataPolling();
    } else {
      this.enableDataPolling();
    }
    this.props.setHeatMapHistoricalMode(eventID, historicalModeEnabled);
  }

  /* Update historical heat map date value when user interacts with slider. */
  onTimeSelection(newIndex) {
    this.props.setHeatMapSliderValue(this.props.selectedEventID, newIndex);
  }

  /* Fetches timestamp for the index selected on the slider and converts the
   * timestamp to a date string. */
  timeSelectLabelRenderer(index) {
    if (!this.props.historicalHeatMapData.timestamps) {
      return "Loading failed";
    }
    return timestampToTimeString(
      this.props.historicalHeatMapData.timestamps[index]
    );
  }

  /* Returns true if the historical tools should be rendered. */
  shouldDisplayHistoricalTools() {
    return this.props.historicalModeEnabled && this.props.historicalHeatMapData;
  }

  shouldDisableHistoricalTools() {
    return (
      this.shouldDisplayHistoricalTools() &&
      !this.props.historicalHeatMapData.data
    );
  }

  /* Creates + returns a TimeSelector element if historical mode is enabled. */
  generateTimeSelector() {
    return (
      <div className={styles.timeSelector}>
        <TimeSelector
          value={this.props.sliderValue}
          onChange={this.onTimeSelection}
          max={_.size(this.props.historicalHeatMapData.data) - 1}
          labelRenderer={this.timeSelectLabelRenderer}
          disabled={this.shouldDisableHistoricalTools()}
        />
      </div>
    );
  }
}

/* Takes a historical heat map API response and returns a response in the same
 * format, but with a sample of `desiredCount` points of data. */
const reduceAmountOfHistoricalHeatMapData = (data, desiredCount) => {
  if (!data || !data.timestamps || data.timestamps.length < desiredCount) {
    return data;
  }
  const timestamps = data.timestamps,
    selectedTimestamps = [];

  for (let i = 0; i < desiredCount; i++) {
    const stepSize = Math.floor(timestamps.length / desiredCount);
    selectedTimestamps.push(timestamps[i * stepSize]);
  }

  return {
    timestamps: selectedTimestamps,
    data: selectedTimestamps.reduce(
      (acc, timestamp) => ({
        ...acc,
        [timestamp]: data.data[timestamp]
      }),
      {}
    )
  };
};

HeatMapPage.propTypes = {
  name: PropTypes.string,
  liveHeatMapData: PropTypes.array,
  selectedEventID: PropTypes.number,
  loadHeatMap: PropTypes.func,
  loadHistoricalHeatMap: PropTypes.func,
  loadTasksData: PropTypes.func,
  setHeatMapHistoricalMode: PropTypes.func,
  setHeatMapSliderValue: PropTypes.func,
  sliderValue: PropTypes.number,
  regions: PropTypes.object,
  tasksData: PropTypes.array,
  historicalModeEnabled: PropTypes.bool,
  historicalHeatMapData: PropTypes.object
};

const mapStateToProps = state => ({
  selectedEventID: state.selectedEventID,
  liveHeatMapData: getSelectedEvent(state).liveHeatMapData,
  tasksData: getSelectedEvent(state).tasksData,
  regions: getRegions(state),
  sliderValue: getSelectedEvent(state).sliderValue,
  historicalHeatMapData: reduceAmountOfHistoricalHeatMapData(
    getSelectedEvent(state).historicalHeatMapData,
    19
  ),
  historicalModeEnabled: getSelectedEvent(state).historicalModeEnabled
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadHeatMap: loadHeatMap,
      loadHistoricalHeatMap: loadHistoricalHeatMap,
      setHeatMapHistoricalMode: setHeatMapHistoricalMode,
      loadTasksData: loadTasksData,
      setHeatMapSliderValue: setHeatMapSliderValue
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatMapPage);
