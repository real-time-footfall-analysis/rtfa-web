import React from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "react-google-maps";

const CreateRegionPopup = props => {
  if (!props.isOpen) {
    return null;
  }
  return (
    <InfoWindow onCloseClick={props.onCloseClick}>
      <div>Hello World!</div>
    </InfoWindow>
  );
};

CreateRegionPopup.propTypes = {
  isOpen: PropTypes.bool,
  onCloseClick: PropTypes.func
};

export default CreateRegionPopup;
