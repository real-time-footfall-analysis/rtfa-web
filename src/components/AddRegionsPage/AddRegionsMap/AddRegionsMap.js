import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import _ from "lodash";
import RegionMarker from "./RegionMarker/RegionMarker";

const AddRegionsMap = withScriptjs(
  withGoogleMap(props => {
    const markers = generateMarkerElements(props.markers);
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 51.507441, lng: -0.127683 }}
      >
        {markers}
      </GoogleMap>
    );
  })
);

const generateMarkerElements = markers => {
  return _.map(markers, marker => {
    return <RegionMarker key={marker.markerID} marker={marker} />;
  });
};

export default AddRegionsMap;
