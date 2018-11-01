/* global google*/
import React, { Component } from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import _ from "lodash";
import {
  DARK_GOOGLE_MAPS_STYLES,
  GOOGLE_MAPS_DEFAULT_CENTRE,
  HEATMAP_POINT_RADIUS,
  HEATMAP_USERS_SCALE_FACTOR
} from "../../../../constants";
import { generateRegionMarkersWithPopup } from "../../../UI/RegionMarker/generators";
import { calculateMidpointOfRegions } from "../../../../utils";
import PropTypes from "prop-types";

/* TODO: Refactor this and AddRegionsMap to use Redux to update centre. */
let centreSet = false;

class HeatMapSubcomponent extends Component {
  componentWillUnmount() {
    centreSet = false;
  }
  render() {
    const markers = generateRegionMarkersWithPopup(this.props.regions);
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={GOOGLE_MAPS_DEFAULT_CENTRE}
        ref={ref => setCentre(ref, this.props.regions)}
        options={{ styles: DARK_GOOGLE_MAPS_STYLES }}
      >
        <HeatmapLayer
          data={generateHeatMapPoints(
            this.props.regions,
            this.props.heatMapData
          )}
          options={{ opacity: 1, radius: HEATMAP_POINT_RADIUS }}
        />
        {markers}
      </GoogleMap>
    );
  }
}

HeatMapSubcomponent.propTypes = {
  regions: PropTypes.object,
  heatMapData: PropTypes.object
};

export const HeatMap = withScriptjs(withGoogleMap(HeatMapSubcomponent));

const setCentre = (ref, regions) => {
  if (_.size(regions) !== 0 && !centreSet && ref) {
    centreSet = true;
    ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
      calculateMidpointOfRegions(regions)
    );
  }
};

const generateHeatMapPoints = (regions, heatMapData) => {
  const points = [];
  _.forEach(heatMapData, (count, regionID) => {
    const region = regions[regionID];
    if (!region) {
      console.warn(`There is no region with ID ${regionID} for this event.`);
      return;
    }
    /* Generate n random points around the centre, within the radius. */
    for (let i = 0; i < count * HEATMAP_USERS_SCALE_FACTOR; i++) {
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
