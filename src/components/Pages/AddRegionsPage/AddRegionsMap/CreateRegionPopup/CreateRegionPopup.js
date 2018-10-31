import React from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "react-google-maps";
import CreateRegionForm from "../CreateRegionForm/CreateRegionForm";
import { bindActionCreators } from "redux";
import { toggleRegionMarkerBox } from "../../../../../actions";
import { connect } from "react-redux";

const CreateRegionPopup = props => {
  if (!props.isOpen) {
    return null;
  }
  const onClose = () =>
    props.toggleBox(props.selectedEventID, props.region.regionID);
  return (
    <InfoWindow onCloseClick={onClose}>
      <CreateRegionForm region={props.region} save={onClose} />
    </InfoWindow>
  );
};

CreateRegionPopup.propTypes = {
  isOpen: PropTypes.bool,
  region: PropTypes.object,
  selectedEventID: PropTypes.number,
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
  state => ({ selectedEventID: state.selectedEventID }),
  mapDispatchToProps
)(CreateRegionPopup);
