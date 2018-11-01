import _ from "lodash";
import CreateRegionPopup from "../../Pages/AddRegionsPage/AddRegionsMap/CreateRegionPopup/CreateRegionPopup";
import React from "react";
import RegionMarker from "./RegionMarker";

export const generateRegionMarkers = regions =>
  generateGenericRegionMarkers(regions, false);

export const generateRegionMarkersWithPopup = regions =>
  generateGenericRegionMarkers(regions, true);

export const generateGenericRegionMarkers = (regions, withPopup) => {
  const regionElements = _.map(regions, region => {
    if (!region.position.lat || !region.position.lng) {
      return null;
    }
    const popup = (
      <CreateRegionPopup isOpen={region.isBoxOpen} region={region} />
    );
    return (
      <RegionMarker key={region.regionID} region={region}>
        {withPopup ? popup : null}
      </RegionMarker>
    );
  });
  /* Filter out any null objects from above (that had no lat/lng info). */
  return regionElements.filter(_.identity);
};
