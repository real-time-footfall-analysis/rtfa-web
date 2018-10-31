/* global google*/
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import _ from "lodash";
import { DARK_GOOGLE_MAPS_STYLES } from "../../../../constants";
import { generateRegionMarkersWithPopup } from "../../../UI/RegionMarker/generators";

const HeatMap = withScriptjs(
  withGoogleMap(props => {
    const markers = generateRegionMarkersWithPopup(props.regions);
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 51.507441, lng: -0.127683 }}
        onClick={props.onClick}
        options={{ styles: DARK_GOOGLE_MAPS_STYLES }}
      >
        <HeatmapLayer
          data={generateHeatMapPoints(props.regions, props.heatMapData)}
          options={{ opacity: 1 }}
        />
        {markers}
      </GoogleMap>
    );
  })
);

const generateHeatMapPoints = (regions, heatMapData) => {
  const points = [];
  _.forEach(heatMapData, (count, regionID) => {
    const region = regions[regionID];
    if (!region) {
      console.warn(`There is no region with ID ${regionID} for this event.`);
      return;
    }
    /* Generate n random points around the centre, within the radius. */
    for (let i = 0; i < count; i++) {
      points.push(createRandomisedPoint(region.position, region.radius));
    }
  });
  return points.map(point => new google.maps.LatLng(point.lat, point.lng));
};

/* Given a centre { lat, lng } and a radius in metres, this returns a
 * point { lat, lng } some randomly generated distance (less than maxRadius)
 * from the centre */
const createRandomisedPoint = (centre, maxRadius) => {
  const degreesInCircle = 360,
    unitsOfLatitudePerMetre = 1 / 111111,
    distance = randomIntFromInterval(0, maxRadius),
    angle = randomIntFromInterval(0, degreesInCircle),
    yDisplacement = distance * Math.sin(angle),
    xDisplacement = distance * Math.cos(angle),
    latDisplacement = yDisplacement * unitsOfLatitudePerMetre,
    lngDisplacement =
      (unitsOfLatitudePerMetre / Math.cos(latDisplacement)) * xDisplacement;
  return {
    lat: centre.lat + latDisplacement,
    lng: centre.lng + lngDisplacement
  };
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default HeatMap;
