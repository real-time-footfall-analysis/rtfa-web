import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import styles from "./HeatMapPage.module.scss";
import { connect } from "react-redux";
import HeatMap from "./HeatMap/HeatMap";
import { TimeSelector } from "./TimeSelector/TimeSelector";
import { GOOGLE_MAPS_URL, HEATMAP_REFRESH_INTERVAL } from "../../../constants";
import {
  loadHeatMap,
  loadTasksData,
  setHeatMapSliderValue
} from "../../../actions";
import { bindActionCreators } from "redux";
import { getRegions, getSelectedEvent } from "../../../selectors";

class HeatMapPage extends Component {
  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        <div style={{ height: "100%" }}>
          {this.generateMapElement()}
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
    const mapContainer = <div className={styles.mapContainer} />;
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
  tasksData: PropTypes.array
};

const mapStateToProps = state => ({
  selectedEventID: state.selectedEventID,
  heatMapData: getSelectedEvent(state).heatMapData,
  tasksData: getSelectedEvent(state).tasksData,
  regions: getRegions(state),
  sliderValue: getSelectedEvent(state).heatMapSliderValue
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadHeatMap: loadHeatMap,
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
