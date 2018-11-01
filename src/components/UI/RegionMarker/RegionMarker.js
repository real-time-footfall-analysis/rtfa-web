import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleRegionMarkerBox } from "../../../actions";

const RegionMarker = props => {
  return (
    <Marker
      key={props.region.regionID}
      label={labelOptions}
      position={props.region.position}
      onClick={() => {
        props.toggleBox(props.selectedEventID, props.region.regionID);
      }}
    >
      {props.children}
    </Marker>
  );
};

const labelOptions = {
  text: "",
  color: "#fff",
  fontFamily: "'Font Awesome 5 Pro'",
  fontSize: "16px",
  fontWeight: "",
  opacity: "0.3"
};

RegionMarker.propTypes = {
  selectedEventID: PropTypes.number,
  position: PropTypes.object,
  region: PropTypes.object,
  toggleBox: PropTypes.func,
  children: PropTypes.element
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
  state => ({ selectedEventID: state.selectedEventID }),
  mapDispatchToProps
)(RegionMarker);
