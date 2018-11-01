import React from "react";
import PropTypes from "prop-types";
import Page from "../../UI/Page/Page";
import AddRegionsMap from "./AddRegionsMap/AddRegionsMap";
import styles from "./AddRegionsPage.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getRegions, getSelectedEvent } from "../../../selectors";
import { createNewRegion } from "../../../actions";
import { GOOGLE_MAPS_URL } from "../../../constants";

const AddRegionsPage = props => {
  return (
    <Page
      title={<span>{props.name}</span>}
      description={props.description}
      flex={true}
    >
      {generateMapElement(props)}
    </Page>
  );
};

const generateMapElement = props => (
  <AddRegionsMap
    googleMapURL={GOOGLE_MAPS_URL}
    loadingElement={<div />}
    containerElement={<div className={styles.mapContainer} />}
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
);

AddRegionsPage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  selectedEvent: PropTypes.object,
  organiserID: PropTypes.number,
  regions: PropTypes.object,
  createNewRegion: PropTypes.func,
  dispatch: PropTypes.func
};

generateMapElement.propTypes = AddRegionsPage.propTypes;

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
