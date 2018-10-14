import React from "react";
import { InputGroup } from "@blueprintjs/core";
import Field from "../Field/Field";

const TextField = props => {
  return (
    <Field {...props}>
      <InputGroup
        large={true}
        leftIcon={props.icon}
        placeholder={props.placeholder}
      />
    </Field>
  );
};

TextField.propTypes = {
  ...Field.propTypes
};

export default TextField;
