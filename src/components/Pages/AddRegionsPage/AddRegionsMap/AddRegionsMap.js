import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { generateRegionMarkersWithPopup } from "../../../UI/RegionMarker/generators";
import { calculateMidpointOfRegions } from "../../../../utils";
import { GOOGLE_MAPS_DEFAULT_CENTRE } from "../../../../constants";
import _ from "lodash";
import CreateRegionForm from "./CreateRegionForm/CreateRegionForm";

/* TODO: Refactor this and HeatMap to use Redux to update centre. */
class AddRegionsMapSubcomponent extends Component {
  componentWillUnmount() {
    centreSet = false;
  }
  render() {
    const markers = generateRegionMarkersWithPopup(
      this.props.regions,
      CreateRegionForm
    );
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={GOOGLE_MAPS_DEFAULT_CENTRE}
        ref={ref => setCentre(ref, this.props.regions)}
        onClick={this.props.onClick}
      >
        {markers}
      </GoogleMap>
    );
  }
}

AddRegionsMapSubcomponent.propTypes = {
  regions: PropTypes.object,
  onClick: PropTypes.func
};

export const AddRegionsMap = withScriptjs(
  withGoogleMap(AddRegionsMapSubcomponent)
);

let centreSet = false;
const setCentre = (ref, regions) => {
  if (_.size(regions) !== 0 && !centreSet && ref) {
    centreSet = true;
    ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setCenter(
      calculateMidpointOfRegions(regions)
    );
  }
};

export default AddRegionsMap;
