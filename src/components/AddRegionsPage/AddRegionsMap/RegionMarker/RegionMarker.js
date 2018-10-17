import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import CreateRegionPopup from "../CreateRegionPopup/CreateRegionPopup";
import { toggleRegionMarkerBox } from "../../../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export const RegionMarker = props => {
  return (
    <Marker
      key={props.marker.markerID}
      position={props.marker.position}
      onClick={() => {
        props.toggleBox(props.marker.markerID);
      }}
    >
      <CreateRegionPopup
        isOpen={props.marker.isBoxOpen}
        onCloseClick={() => props.toggleBox(props.marker.markerID)}
        marker={props.marker}
      />
    </Marker>
  );
};

RegionMarker.propTypes = {
  position: PropTypes.object,
  marker: PropTypes.object,
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
  null,
  mapDispatchToProps
)(RegionMarker);
