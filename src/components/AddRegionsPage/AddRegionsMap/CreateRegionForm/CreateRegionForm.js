import React from "react";
import PropTypes from "prop-types";
import TextField from "../../../UI/TextField/TextField";
import { Radio, RadioGroup } from "@blueprintjs/core";
import NumberField from "../../../UI/NumberField/NumberField";
import styles from "./CreateRegionForm.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateRegionName, updateRegionType } from "../../../../actions";

const CreateRegionForm = props => {
  return (
    <div className={styles.markerForm}>
      <TextField
        label="Region Name"
        icon="edit"
        onChange={event =>
          props.updateRegionName(props.marker.markerID, event.target.value)
        }
        value={props.marker.name}
      />
      <RadioGroup
        onChange={event =>
          props.updateRegionType(props.marker.markerID, event.target.value)
        }
        inline={true}
        label="Region Type"
        selectedValue={props.marker.type}
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
  updateRegionType: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateRegionName: updateRegionName,
      updateRegionType: updateRegionType
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(CreateRegionForm);
