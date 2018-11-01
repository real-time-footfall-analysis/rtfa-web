import React from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "react-google-maps";
import { bindActionCreators } from "redux";
import { toggleRegionMarkerBox } from "../../../actions";
import { connect } from "react-redux";

const RegionPopup = props => {
  if (!props.isOpen) {
    return null;
  }
  const onClose = () =>
    props.toggleBox(props.selectedEventID, props.region.regionID);
  const popupContent = React.createElement(props.childType, props);
  return <InfoWindow onCloseClick={onClose}>{popupContent}</InfoWindow>;
};

RegionPopup.propTypes = {
  isOpen: PropTypes.bool,
  region: PropTypes.object,
  selectedEventID: PropTypes.number,
  toggleBox: PropTypes.func,
  childType: PropTypes.element
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
)(RegionPopup);
