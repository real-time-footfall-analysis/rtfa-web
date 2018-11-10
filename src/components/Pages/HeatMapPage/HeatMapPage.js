import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import styles from "./HeatMapPage.module.scss";
import { connect } from "react-redux";
import HeatMap from "./HeatMap/HeatMap";
import { TimeSelector } from "../../UI/TimeSelector/TimeSelector";
import { GOOGLE_MAPS_URL, HEATMAP_REFRESH_INTERVAL } from "../../../constants";
import {
  loadHeatMap,
  loadTasksData,
  setHeatMapSliderValue,
  toggleHeatMapHistoricalMode
} from "../../../actions";
import { bindActionCreators } from "redux";
import { getRegions, getSelectedEvent } from "../../../selectors";
import { HistoricalModeToggle } from "./HistoricalModeToggle/HistoricalModeToggle";

class HeatMapPage extends Component {
  constructor(props) {
    super(props);
    this.enableHistoricalMode = this.enableHistoricalMode.bind(this);
    this.disableHistoricalMode = this.disableHistoricalMode.bind(this);
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
    this.dataFetcher = setInterval(
      () => this.props.loadHeatMap(this.props.selectedEventID),
      HEATMAP_REFRESH_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.dataFetcher);
  }

  generateMapElement() {
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
        tasksData={this.props.tasksData}
      />
    );
  }

  enableHistoricalMode() {
    this.props.toggleHistoricalMode(this.props.selectedEventID, true);
  }

  disableHistoricalMode() {
    this.props.toggleHistoricalMode(this.props.selectedEventID, false);
  }

  generateHistoricalToggle() {
    return (
      <HistoricalModeToggle
        historicalModeEnabled={this.props.historicalModeEnabled}
        enableHistoricalMode={this.enableHistoricalMode}
        disableHistoricalMode={this.disableHistoricalMode}
      />
    );
  }

  generateTimeSelector() {
    if (!this.props.historicalModeEnabled) {
      return;
    }
    return (
      <div className={styles.timeSelector}>
        <TimeSelector
          value={this.props.sliderValue}
          onChange={newValue =>
            this.props.setHeatMapSliderValue(
              this.props.selectedEventID,
              newValue
            )
          }
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
