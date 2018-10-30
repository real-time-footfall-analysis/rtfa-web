import React from "react";
import PropTypes from "prop-types";
import Page from "../Page/Page";
import AddRegionsMap from "./AddRegionsMap/AddRegionsMap";
import styles from "./AddRegionsPage.module.scss";
import { bindActionCreators } from "redux";
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
            props.organiserID,
            props.selectedEvent.eventID,
            clickEvent,
            props.createNewRegion
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
  organiserID: PropTypes.number,
  regions: PropTypes.object,
  createNewRegion: PropTypes.func,
  dispatch: PropTypes.func
};

const storeNewRegion = (
  organiserID,
  eventID,
  clickEvent,
  createNewRegionAction
) => {
  const region = generateRegionObject(eventID, clickEvent);
  createNewRegionAction(organiserID, eventID, region);
};

const generateRegionObject = (eventID, clickEvent) => {
  const lat = clickEvent.latLng.lat(),
    lng = clickEvent.latLng.lng();
  return {
    name: "",
    type: "beacon",
    radius: 1,
    position: {
      lat: lat,
      lng: lng
    }
  };
};

const mapStateToProps = state => ({
  organiserID: state.organiserID,
  selectedEvent: getSelectedEvent(state),
  regions: getRegions(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createNewRegion: createNewRegion }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRegionsPage);
