import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import _ from "lodash";
import RegionMarker from "./RegionMarker/RegionMarker";

const AddRegionsMap = withScriptjs(
  withGoogleMap(props => {
    const markers = generateRegionMarkers(props.regions);
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 51.507441, lng: -0.127683 }}
        onClick={props.onClick}
      >
        {markers}
      </GoogleMap>
    );
  })
);

/* Creates <RegionMarker/> React Elements for the given array of regions. */
const generateRegionMarkers = regions => {
  const regionElements = _.map(regions, region => {
    if (!region.position.lat || !region.position.lng) {
      return null;
    }
    return <RegionMarker key={region.regionID} region={region} />;
  });
  /* Filter out any null objects from above (that had no lat/lng info). */
  return regionElements.filter(_.identity);
};

export default AddRegionsMap;
