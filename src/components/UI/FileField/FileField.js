import React from "react";
import { FileInput } from "@blueprintjs/core";
import styles from "./FileField.module.scss";
import Field from "../Field/Field";

const FileField = props => {
  return (
    <Field {...props}>
      <FileInput
        className={styles.fileInput}
        large={true}
        text={props.placeholder}
        onInputChange={event => event}
      />
    </Field>
  );
};

FileField.propTypes = {
  ...Field.propTypes
};

export default FileField;
