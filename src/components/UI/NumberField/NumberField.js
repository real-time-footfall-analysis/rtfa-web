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
  max: PropTypes.number
};

export default NumberField;
