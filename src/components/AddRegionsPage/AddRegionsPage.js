import React from "react";
import PropTypes from "prop-types";
import Page from "../Page/Page";
import AddRegionsMap from "./AddRegionsMap/AddRegionsMap";
import styles from "./AddRegionsPage.module.scss";

export const AddRegionsPage = props => {
  const mapContainer = <div className={styles.mapContainer} />;
  const MAPS_API_KEY = "AIzaSyDaIck1_kxNWiyEQetkb_DH78bV6T7Lz-g";
  return (
    <Page
      title={<span>{props.name}</span>}
      description={props.description}
      flex={true}
    >
      <AddRegionsMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAPS_API_KEY}`}
        loadingElement={<div />}
        containerElement={mapContainer}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </Page>
  );
};

AddRegionsPage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
};

export default AddRegionsPage;
