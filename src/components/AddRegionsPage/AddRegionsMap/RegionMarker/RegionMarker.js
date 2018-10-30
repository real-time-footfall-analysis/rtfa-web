import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import CreateRegionPopup from "../CreateRegionPopup/CreateRegionPopup";
import { toggleRegionMarkerBox } from "../../../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSelectedEvent } from "../../../../selectors";

export const RegionMarker = props => {
  return (
    <Marker
      key={props.region.regionID}
      position={props.region.position}
      onClick={() => {
        props.toggleBox(props.selectedEvent.eventID, props.region.regionID);
      }}
    >
      <CreateRegionPopup
        isOpen={props.region.isBoxOpen}
        onCloseClick={() =>
          props.toggleBox(props.selectedEvent.eventID, props.region.regionID)
        }
        region={props.region}
      />
    </Marker>
  );
};

RegionMarker.propTypes = {
  selectedEvent: PropTypes.object,
  position: PropTypes.object,
  region: PropTypes.object,
  toggleBox: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleBox: toggleRegionMarkerBox
    },
    dispatch
  );
};

export default connect(
  state => ({ selectedEvent: getSelectedEvent(state) }),
  mapDispatchToProps
)(RegionMarker);
