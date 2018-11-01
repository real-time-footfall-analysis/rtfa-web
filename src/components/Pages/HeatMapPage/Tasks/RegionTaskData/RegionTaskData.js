import React from "react";
import PropTypes from "prop-types";
import styles from "./RegionTaskData.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateRegionOnServer,
  updateRegionName,
  updateRegionRadius,
  updateRegionType
} from "../../../../../actions";
import { getSelectedEvent } from "../../../../../selectors";

const RegionTaskData = props => {
  return (
    <div className={styles.taskForm}>
      <h1>{props.region.name}</h1>
    </div>
  );
};

RegionTaskData.propTypes = {
  region: PropTypes.object,
  updateRegionName: PropTypes.func,
  updateRegionType: PropTypes.func,
  updateRegionRadius: PropTypes.func,
  updateRegionOnServer: PropTypes.func,
  onClose: PropTypes.func,
  selectedEvent: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateRegionName: updateRegionName,
      updateRegionType: updateRegionType,
      updateRegionRadius: updateRegionRadius,
      updateRegionOnServer: updateRegionOnServer
    },
    dispatch
  );
};

export default connect(
  state => ({ selectedEvent: getSelectedEvent(state) }),
  mapDispatchToProps
)(RegionTaskData);
