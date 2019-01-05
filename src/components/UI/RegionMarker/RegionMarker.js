import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleRegionMarkerBox } from "../../../actions";
import { REGION_CATEGORIES } from "../../../constants";

const RegionMarker = props => {
  return (
    <Marker
      key={props.region.regionID}
      label={getLabelOptions(props.region.cat)}
      position={props.region.position}
      onClick={() => {
        props.toggleBox(props.selectedEventID, props.region.regionID);
      }}
    >
      {props.children}
    </Marker>
  );
};

const getLabelOptions = regionCategory => ({
  text: REGION_CATEGORIES[regionCategory].icon,
  color: "#fff",
  fontFamily: "'Font Awesome 5 Pro'",
  fontSize: "16px",
  fontWeight: ""
});

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
