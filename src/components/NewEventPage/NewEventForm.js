import React, { Component } from "react";
import styles from "./NewEventForm.module.scss";
import Button from "../UI/Button/Button";
import TextField from "../UI/TextField/TextField";
import NumberField from "../UI/NumberField/NumberField";
import DateRangeField from "../UI/DateRangeField/DateRangeField";

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
      <TextField
        className={styles.formGroup}
        icon="sort-alphabetical"
        label="Event Name"
        labelFor="event-name"
        required={true}
        placeholder="What is your event's name?"
      />
    );
  }

  generateLocationField() {
    return (
      <TextField
        className={styles.formGroup}
        icon="geolocation"
        label="Location"
        labelFor="location"
        required={true}
        placeholder="Where is your event being held?"
      />
    );
  }

  generateAttendanceField() {
    return (
      <NumberField
        className={styles.formGroup}
        label="Maximum Attendance"
        labelFor="attendance"
        required={true}
        icon="people"
        placeholder="What is your event's maximum capacity?"
        min={1}
        max={200000}
      />
    );
  }

  generateTimingField() {
    return (
      <DateRangeField
        className={styles.formGroup}
        label="Timing"
        labelFor="attendance"
        required={true}
        minDate={new Date()}
        maxDate={new Date("2040-12-31")}
      />
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
