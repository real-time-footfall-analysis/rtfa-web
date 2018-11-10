import _ from "lodash";
import RegionPopup from "../../UI/RegionPopup/RegionPopup";
import React from "react";
import RegionMarker from "./RegionMarker";

export const generateRegionMarkers = regions =>
  generateGenericRegionMarkers(regions, null);

export const generateRegionMarkersWithPopup = (
  regions,
  popupElementClass,
  props
) => generateGenericRegionMarkers(regions, popupElementClass, props);

export const generateGenericRegionMarkers = (
  regions,
  popupElementClass,
  props
) => {
  const regionElements = _.map(regions, region => {
    if (!region.position.lat || !region.position.lng) {
      return null;
    }
    const popup = (
      <RegionPopup
        isOpen={region.isBoxOpen}
        region={region}
        childType={popupElementClass}
        {...props}
      />
    );
    return (
      <RegionMarker key={region.regionID} region={region}>
        {popupElementClass !== null ? popup : null}
      </RegionMarker>
    );
  });
  /* Filter out any null objects from above (that had no lat/lng info). */
  return regionElements.filter(_.identity);
};
