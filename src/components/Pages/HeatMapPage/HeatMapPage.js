import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import styles from "./HeatMapPage.module.scss";
import { connect } from "react-redux";
import HeatMap from "./HeatMap/HeatMap";
import { GOOGLE_MAPS_URL } from "../../../constants";

class HeatMapPage extends Component {
  render() {
    return (
      <Page title={<span>{this.props.name}</span>} flex={true}>
        {this.generateMapElement()}
      </Page>
    );
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
  events: PropTypes.object
};

export default connect(state => ({ events: state.events }))(HeatMapPage);
