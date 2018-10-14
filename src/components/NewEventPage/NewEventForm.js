import React, { Component } from "react";
import { FormGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import styles from "./NewEventForm.module.scss";
import Button from "../UI/Button/Button";

class NewEventForm extends Component {
  render() {
    return (
      <div className={styles.formGroups}>
        {this.generateNameField()}
        {this.generateLocationField()}
        {this.generateAttendanceField()}
        {this.generateTimingField()}
        {this.generateSubmitButton()}
      </div>
    );
  }

  generateNameField() {
    return (
      <FormGroup
        className={styles.formGroup}
        label="Event Name"
        labelFor="event-name"
        labelInfo="(required)"
      >
        <InputGroup
          large={true}
          leftIcon="sort-alphabetical"
          placeholder="What is your event's name?"
        />
      </FormGroup>
    );
  }

  generateLocationField() {
    return (
      <FormGroup
        className={styles.formGroup}
        label="Location"
        labelFor="location"
        labelInfo="(required)"
        helperText="This can be imprecise, e.g. 'Leeds, UK'"
      >
        <InputGroup
          large={true}
          leftIcon="geolocation"
          placeholder="Where is your event being held?"
        />
      </FormGroup>
    );
  }

  generateAttendanceField() {
    return (
      <FormGroup
        className={styles.formGroup}
        label="Maximum Attendance"
        labelFor="attendance"
        labelInfo="(required)"
      >
        <NumericInput
          large={true}
          fill={true}
          leftIcon="people"
          placeholder="What is your event's maximum capacity?"
        />
      </FormGroup>
    );
  }

  generateTimingField() {
    return (
      <FormGroup
        className={styles.formGroup}
        label="Timing"
        labelFor="attendance"
        labelInfo="(required)"
      >
        <DateRangeInput
          formatDate={date => date.toLocaleString()}
          parseDate={str => new Date(str)}
          shortcuts={false}
          allowSingleDayRange={true}
          closeOnSelection={true}
          contiguousCalendarMonths={true}
          minDate={new Date()}
          maxDate={new Date("2040-12-31")}
        />
      </FormGroup>
    );
  }

  generateSubmitButton() {
    return (
      <Button rightIcon="chevron-right" onClick={this.submitForm}>
        Create Event
      </Button>
    );
  }

  /* TODO: Actually submit the form and then redirect to the next page. */
  submitForm() {
    alert("Submitted!");
  }
}

export default NewEventForm;
