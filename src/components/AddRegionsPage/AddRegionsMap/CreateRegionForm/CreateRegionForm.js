import React from "react";
import PropTypes from "prop-types";
import TextField from "../../../UI/TextField/TextField";
import { Radio, RadioGroup } from "@blueprintjs/core";
import NumberField from "../../../UI/NumberField/NumberField";
import styles from "./CreateRegionForm.module.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateRegionName,
  updateRegionRadius,
  updateRegionType
} from "../../../../actions";
import { getSelectedEvent } from "../../../../selectors";
import Button from "../../../UI/Button/Button";

const CreateRegionForm = props => {
  return (
    <div className={styles.regionForm}>
      <TextField
        label="Region Name"
        placeholder="e.g. The Union Bar"
        icon="edit"
        onChange={event =>
          props.updateRegionName(
            props.selectedEvent.eventID,
            props.region.regionID,
            event.target.value
          )
        }
        value={props.region.name}
      />
      <RadioGroup
        onChange={event =>
          props.updateRegionType(
            props.selectedEvent.eventID,
            props.region.regionID,
            event.target.value
          )
        }
        inline={true}
        label="Region Type"
        selectedValue={props.region.type}
        className={styles.radioGroup}
      >
        <Radio label="Beacon" value="Beacon" />
        <Radio label="GPS" value="GPS" />
      </RadioGroup>
      <NumberField
        label="Region Radius (metres)"
        placeholder="e.g. 25"
        icon="cell-tower"
        helperText="How wide do you want your region to be?"
        onChange={newValue =>
          props.updateRegionRadius(
            props.selectedEvent.eventID,
            props.region.regionID,
            newValue
          )
        }
        value={props.region.radius}
        min={1}
        max={50000}
      />
      <Button
        className={styles.saveButton}
        leftIcon="check-circle"
        fill={true}
        onClick={props.save}
      >
        Save
      </Button>
    </div>
  );
};

CreateRegionForm.propTypes = {
  region: PropTypes.object,
  updateRegionName: PropTypes.func,
  updateRegionType: PropTypes.func,
  updateRegionRadius: PropTypes.func,
  save: PropTypes.func,
  selectedEvent: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateRegionName: updateRegionName,
      updateRegionType: updateRegionType,
      updateRegionRadius: updateRegionRadius
    },
    dispatch
  );
};

export default connect(
  state => ({ selectedEvent: getSelectedEvent(state) }),
  mapDispatchToProps
)(CreateRegionForm);
