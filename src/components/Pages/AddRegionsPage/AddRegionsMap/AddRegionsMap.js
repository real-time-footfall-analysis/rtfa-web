import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { generateRegionMarkersWithPopup } from "../../../UI/RegionMarker/generators";

const AddRegionsMap = withScriptjs(
  withGoogleMap(props => {
    const markers = generateRegionMarkersWithPopup(props.regions);
    return (
      <GoogleMap
        defaultZoom={9}
        /* TODO: Calculate center based on center of regions */
        defaultCenter={{ lat: 51.507441, lng: -0.127683 }}
        onClick={props.onClick}
      >
        {markers}
      </GoogleMap>
    );
  })
);

export default AddRegionsMap;
