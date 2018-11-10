import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import _ from "lodash";

import { GOOGLE_MAPS_URL, HEATMAP_REFRESH_INTERVAL } from "../../../constants";
import {
  loadHeatMap,
  loadTasksData,
  setHeatMapSliderValue,
  toggleHeatMapHistoricalMode
} from "../../../actions";
import { getRegions, getSelectedEvent } from "../../../selectors";
import { timestampToDateString } from "../../../utils";
import Page from "../../UI/Page/Page";
import { TimeSelector } from "../../UI/TimeSelector/TimeSelector";
import HeatMap from "./HeatMap/HeatMap";
import { HistoricalModeToggle } from "./HistoricalModeToggle/HistoricalModeToggle";

import styles from "./HeatMapPage.module.scss";

class HeatMapPage extends Component {
  constructor(props) {
    super(props);
    /* Bind callbacks. */
    this.timeSelectLabelRenderer = this.timeSelectLabelRenderer.bind(this);
    this.onTimeSelection = this.onTimeSelection.bind(this);
    this.historicalModeChange = this.historicalModeChange.bind(this);
  }

  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        <div className={styles.heatMapPage}>
          {this.generateHistoricalToggle()}
          {this.generateMapElement()}
          {this.generateTimeSelector()}
        </div>
      </Page>
    );
  }

  componentDidMount() {
    this.props.loadHeatMap(this.props.selectedEventID);
    this.props.loadTasksData(this.props.selectedEventID);
    window.a = () => this.props.loadHeatMap(this.props.selectedEventID);
    /* Poll for live heat map data every N seconds. */
    this.enableDataPolling();
  }

  componentWillUnmount() {
    /* Stop polling for live heatmap data. */
    clearInterval(this.dataFetcher);
  }

  generateMapElement() {
    /* Make room for time slider if needed. */
    const shrinkMap = this.props.historicalModeEnabled ? styles.shrink : "";
    const mapContainer = (
      <div className={`${styles.mapContainer} ${shrinkMap}`} />
    );
    return (
      <HeatMap
        googleMapURL={GOOGLE_MAPS_URL}
        loadingElement={<div />}
        containerElement={mapContainer}
        mapElement={<div style={{ height: "100%" }} />}
        regions={this.props.regions}
        heatMapData={this.props.heatMapData}
        randomise={!this.props.historicalModeEnabled}
        tasksData={this.props.tasksData}
      />
    );
  }

  generateHistoricalToggle() {
    return (
      <HistoricalModeToggle
        historicalModeEnabled={this.props.historicalModeEnabled}
        toggleHistoricalMode={this.historicalModeChange}
        selectedEventID={this.props.selectedEventID}
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
    historicalModeEnabled
      ? this.disableDataPolling()
      : this.enableDataPolling();
    this.props.toggleHistoricalMode(eventID, historicalModeEnabled);
  }

  /* Update historical heat map date value when user interacts with slider. */
  onTimeSelection(newValue) {
    this.props.setHeatMapSliderValue(this.props.selectedEventID, newValue);
  }

  /* Fetches timestamp for the index selected on the slider and converts the
   * timestamp to a date string. */
  timeSelectLabelRenderer(index) {
    return timestampToDateString(
      this.props.historicalHeatMapData.timestamps[index]
    );
  }

  /* Returns true if the time selector is ready for use. */
  shouldDisplayTimeSelector() {
    return this.props.historicalModeEnabled && this.props.historicalHeatMapData;
  }

  /* Creates + returns a TimeSelector element if historical mode is enabled. */
  generateTimeSelector() {
    if (!this.shouldDisplayTimeSelector()) {
      return;
    }
    return (
      <div className={styles.timeSelector}>
        <TimeSelector
          value={this.props.sliderValue}
          onChange={this.onTimeSelection}
          max={_.size(this.props.historicalHeatMapData.data) - 1}
          labelRenderer={this.timeSelectLabelRenderer}
        />
      </div>
    );
  }
}

HeatMapPage.propTypes = {
  name: PropTypes.string,
  heatMapData: PropTypes.object,
  selectedEventID: PropTypes.number,
  loadHeatMap: PropTypes.func,
  loadTasksData: PropTypes.func,
  setHeatMapSliderValue: PropTypes.func,
  sliderValue: PropTypes.number,
  regions: PropTypes.object,
  tasksData: PropTypes.array,
  historicalModeEnabled: PropTypes.bool,
  historicalHeatMapData: PropTypes.object,
  toggleHistoricalMode: PropTypes.func
};

const mapStateToProps = state => ({
  selectedEventID: state.selectedEventID,
  heatMapData: getSelectedEvent(state).heatMapData,
  tasksData: getSelectedEvent(state).tasksData,
  regions: getRegions(state),
  sliderValue: getSelectedEvent(state).heatMapSliderValue,
  historicalHeatMapData: getSelectedEvent(state).historicalHeatMapData,
  historicalModeEnabled: getSelectedEvent(state).historicalModeEnabled
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadHeatMap: loadHeatMap,
      loadTasksData: loadTasksData,
      setHeatMapSliderValue: setHeatMapSliderValue,
      toggleHistoricalMode: toggleHeatMapHistoricalMode
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatMapPage);
