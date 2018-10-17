import React from "react";
import PropTypes from "prop-types";
import { NumericInput } from "@blueprintjs/core";
import Field from "../Field/Field";

const NumberField = props => {
  return (
    <Field {...props}>
      <NumericInput
        min={props.min}
        max={props.max}
        value={props.value}
        large={true}
        fill={true}
        leftIcon={props.icon}
        placeholder={props.placeholder}
      />
    </Field>
  );
};

NumberField.propTypes = {
  ...Field.propTypes,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number
};

export default NumberField;
