import React, { Component } from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import PropTypes from "prop-types";
import _ from "lodash";

import {
  DARK_GOOGLE_MAPS_STYLES,
  GOOGLE_MAPS_DEFAULT_CENTRE,
  HEATMAP_POINT_RADIUS,
  HEATMAP_USERS_SCALE_FACTOR
} from "../../../../constants";
import { generateRegionMarkersWithPopup } from "../../../UI/RegionMarker/generators";
import { calculateMidpointOfRegions } from "../../../../utils";
import RegionTaskData from "../Tasks/RegionTaskData/RegionTaskData";

/* TODO: Refactor this and AddRegionsMap to use Redux to update centre. */
window.centreSet = false;

class HeatMapSubcomponent extends Component {
  componentWillUnmount() {
    window.centreSet = false;
  }

  getProcessedData() {
    if (!this.props.heatMapData) {
      return [];
    }
    return this.props.historicalMode
      ? generateHeatMapPoints(this.props.regions, this.props.heatMapData, false)
      : this.props.heatMapData;
  }

  render() {
    const markers = generateRegionMarkersWithPopup(
      this.props.regions,
      RegionTaskData,
      { tasksData: this.props.tasksData }
    );
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={GOOGLE_MAPS_DEFAULT_CENTRE}
        ref={ref => setCentre(ref, this.props.regions)}
        options={{ styles: DARK_GOOGLE_MAPS_STYLES }}
      >
        <HeatmapLayer
          data={this.getProcessedData()}
          options={{
            opacity: 1,
            radius: this.props.historicalMode
              ? HEATMAP_POINT_RADIUS * 4
              : HEATMAP_POINT_RADIUS
          }}
        />
        {markers}
      </GoogleMap>
    );
  }
}

HeatMapSubcomponent.propTypes = {
  regions: PropTypes.object,
  heatMapData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tasksData: PropTypes.array,
  historicalMode: PropTypes.bool
};

export const HeatMap = withScriptjs(withGoogleMap(HeatMapSubcomponent));

/* TODO: This is duplicated from AddRegionsMap, REFACTOR. */
const setCentre = (ref, regions) => {
  if (_.size(regions) !== 0 && !window.centreSet && ref) {
    window.centreSet = true;
    ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
      calculateMidpointOfRegions(regions)
    );
  }
};

export const generateHeatMapPoints = (regions, heatMapData, randomise) => {
  const google = window.google;
  if (!google) {
    console.error("Google Maps API not found! Check (HeatMap.js:84)");
    console.trace();
    return [];
  }
  const points = [];
  _.forEach(heatMapData, (count, regionID) => {
    const region = regions[regionID];
    if (!region) {
      console.warn(`There is no region with ID ${regionID} for this event.`);
      return;
    }
    /* Generate n random points around the centre, within the radius. */
    for (let i = 0; i < count * HEATMAP_USERS_SCALE_FACTOR; i++) {
      const point = randomise
        ? createRandomisedPoint(region.position, region.radius)
        : region.position;
      points.push(point);
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
