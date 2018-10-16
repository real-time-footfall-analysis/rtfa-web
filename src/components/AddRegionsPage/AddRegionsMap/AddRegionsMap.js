import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

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
  return markers.map(marker => (
    <Marker
      key={marker.position.lat + marker.position.lng}
      position={marker.position}
      draggable={true}
    />
  ));
};

export default AddRegionsMap;
