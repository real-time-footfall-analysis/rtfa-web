import React from "react";
import PropTypes from "prop-types";
import Field from "../Field/Field";
import { DateRangeInput } from "@blueprintjs/datetime";

const DateRangeField = props => {
  return (
    <Field {...props}>
      <DateRangeInput
        formatDate={date => date.toLocaleString()}
        parseDate={str => new Date(str)}
        shortcuts={false}
        allowSingleDayRange={true}
        closeOnSelection={true}
        contiguousCalendarMonths={true}
        minDate={props.minDate}
        maxDate={props.maxDate}
      />
    </Field>
  );
};

DateRangeField.propTypes = {
  ...Field.propTypes,
  minDate: PropTypes.object,
  maxDate: PropTypes.object
};

export default DateRangeField;
