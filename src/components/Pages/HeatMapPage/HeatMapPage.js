import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import styles from "./HeatMapPage.module.scss";
import { connect } from "react-redux";
import HeatMap from "./HeatMap/HeatMap";
import { GOOGLE_MAPS_URL, HEATMAP_REFRESH_INTERVAL } from "../../../constants";
import { loadHeatMap } from "../../../actions";
import { bindActionCreators } from "redux";
import { getRegions, getSelectedEvent } from "../../../selectors";

class HeatMapPage extends Component {
  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        {this.generateMapElement()}
      </Page>
    );
  }

  componentDidMount() {
    this.props.loadHeatMap(this.props.selectedEventID);
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
      />
    );
  }
}

HeatMapPage.propTypes = {
  name: PropTypes.string,
  heatMapData: PropTypes.object,
  selectedEventID: PropTypes.number,
  loadHeatMap: PropTypes.func,
  regions: PropTypes.object
};

const mapStateToProps = state => ({
  selectedEventID: state.selectedEventID,
  heatMapData: getSelectedEvent(state).heatMapData,
  regions: getRegions(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadHeatMap: loadHeatMap }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatMapPage);
