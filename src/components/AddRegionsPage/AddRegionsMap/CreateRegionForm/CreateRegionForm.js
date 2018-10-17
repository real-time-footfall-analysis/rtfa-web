import React from "react";
import PropTypes from "prop-types";
import TextField from "../../../UI/TextField/TextField";
import { Radio, RadioGroup } from "@blueprintjs/core";
import NumberField from "../../../UI/NumberField/NumberField";
import styles from "./CreateRegionForm.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateRegionName } from "../../../../actions";
import { getMarkerName } from "../../../../selectors";

const CreateRegionForm = props => {
  return (
    <div className={styles.markerForm}>
      <TextField
        label="Region Name"
        icon="edit"
        onChange={event =>
          props.updateRegionName(props.marker.markerID, event.target.value)
        }
        value={props.name}
      />
      <RadioGroup
        onChange={() => alert("Not yet implemented.")}
        inline={true}
        label="Region Type"
        selectedValue="Beacon"
        className={styles.radioGroup}
      >
        <Radio label="Beacon" value="Beacon" />
        <Radio label="GPS" value="GPS" />
      </RadioGroup>
      <NumberField
        label="Region Radius (metres)"
        icon="cell-tower"
        helperText="How wide do you want your region to be?"
      />
    </div>
  );
};

CreateRegionForm.propTypes = {
  marker: PropTypes.object,
  updateRegionName: PropTypes.func,
  name: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: getMarkerName(state, ownProps.marker.markerID)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateRegionName: updateRegionName
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRegionForm);
