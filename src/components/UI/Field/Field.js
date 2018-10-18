import React from "react";
import PropTypes from "prop-types";
import styles from "./Field.module.scss"; // eslint-disable-line
import { FormGroup } from "@blueprintjs/core";

const Field = props => {
  return (
    <FormGroup
      className={props.className}
      label={props.label}
      labelFor={props.labelFor}
      labelInfo={props.required ? "(required)" : ""}
      helperText={props.helperText}
    >
      {props.children}
    </FormGroup>
  );
};

Field.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelFor: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.element,
  onInputChange: PropTypes.func
};

export default Field;
