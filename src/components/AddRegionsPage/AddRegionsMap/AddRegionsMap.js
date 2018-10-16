import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const AddRegionsMap = withScriptjs(
  withGoogleMap(() => {
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 51.507441, lng: -0.127683 }}
      />
    );
  })
);

export default AddRegionsMap;
