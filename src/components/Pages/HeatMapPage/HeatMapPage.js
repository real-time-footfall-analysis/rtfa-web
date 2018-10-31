import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import styles from "./HeatMapPage.module.scss";
import { connect } from "react-redux";
import HeatMap from "./HeatMap/HeatMap";
import { GOOGLE_MAPS_URL } from "../../../constants";
import { loadHeatMap } from "../../../actions";
import { bindActionCreators } from "redux";

class HeatMapPage extends Component {
  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        {this.generateMapElement()}
      </Page>
    );
  }

  componentDidMount() {
    this.dataFetcher = setInterval(
      () => this.props.loadHeatMap(this.props.selectedEventID),
      10000
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
      />
    );
  }
}

HeatMapPage.propTypes = {
  name: PropTypes.string,
  selectedEventID: PropTypes.number,
  loadHeatMap: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadHeatMap: loadHeatMap
    },
    dispatch
  );
};

export default connect(
  state => ({ selectedEventID: state.selectedEventID }),
  mapDispatchToProps
)(HeatMapPage);
