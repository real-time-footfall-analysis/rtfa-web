import React from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "react-google-maps";
import CreateRegionForm from "../CreateRegionForm/CreateRegionForm";

const CreateRegionPopup = props => {
  if (!props.isOpen) {
    return null;
  }
  return (
    <InfoWindow onCloseClick={props.onCloseClick}>
      <CreateRegionForm marker={props.marker} save={props.onCloseClick} />
    </InfoWindow>
  );
};

CreateRegionPopup.propTypes = {
  isOpen: PropTypes.bool,
  onCloseClick: PropTypes.func,
  marker: PropTypes.object
};

export default CreateRegionPopup;
