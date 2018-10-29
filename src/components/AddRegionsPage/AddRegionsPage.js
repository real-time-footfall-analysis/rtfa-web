import React from "react";
import PropTypes from "prop-types";
import Page from "../Page/Page";
import AddRegionsMap from "./AddRegionsMap/AddRegionsMap";
import styles from "./AddRegionsPage.module.scss";
import { connect } from "react-redux";
import { getRegions, getSelectedEvent } from "../../selectors";
import { createNewRegion } from "../../actions";

const AddRegionsPage = props => {
  const MAPS_API_KEY = "AIzaSyDaIck1_kxNWiyEQetkb_DH78bV6T7Lz-g",
    mapContainer = <div className={styles.mapContainer} />;
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
        regions={props.regions}
        onClick={clickEvent =>
          storeNewRegion(
            props.selectedEvent.eventID,
            clickEvent,
            props.dispatch
          )
        }
      />
    </Page>
  );
};

AddRegionsPage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  selectedEvent: PropTypes.object,
  regions: PropTypes.object,
  storeNewRegion: PropTypes.func,
  dispatch: PropTypes.func
};

const storeNewRegion = (eventID, clickEvent, dispatch) => {
  const region = generateRegionObject(eventID, clickEvent);
  dispatch(createNewRegion(eventID, region));
};

const generateRegionObject = (eventID, clickEvent) => {
  const lat = clickEvent.latLng.lat(),
    lng = clickEvent.latLng.lng();
  return {
    name: "",
    type: "Beacon",
    radius: 1,
    position: {
      lat: lat,
      lng: lng
    },
    isBoxOpen: true
  };
};

const mapStateToProps = state => ({
  selectedEvent: getSelectedEvent(state),
  regions: getRegions(state)
});

export default connect(
  mapStateToProps,
  null
)(AddRegionsPage);
