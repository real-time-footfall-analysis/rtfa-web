import React, { Component } from "react";
import styles from "./NewEventForm.module.scss";
import Button from "../UI/Button/Button";
import TextField from "../UI/TextField/TextField";
import NumberField from "../UI/NumberField/NumberField";
import DateRangeField from "../UI/DateRangeField/DateRangeField";
import FileField from "../UI/FileField/FileField";

class NewEventForm extends Component {
  render() {
    /*
    const indoorMappingDetails = (
      <section key={2} className={styles.formGroups}>
        <h2>Mapping Details</h2>
        <div className={styles.fields}>
          {this.generateMapImageField()}
          {this.generateMapWidthField()}
        </div>
      </section>
    );
    */
    return [
      <section key={1} className={styles.formGroups}>
        <h2>Basic Info</h2>
        <div className={styles.fields}>
          {this.generateNameField()}
          {this.generateLocationField()}
          {this.generateAttendanceField()}
          {this.generateTimingField()}
          {this.generateCoverPhotoField()}
          {this.generateSubmitButton()}
        </div>
      </section>
    ];
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
        helperText="This can be imprecise, e.g. Leeds, UK"
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

  generateCoverPhotoField() {
    return (
      <TextField
        className={styles.formGroup}
        icon="media"
        label="Cover Photo"
        labelFor="cover-photo"
        helperText="Adding a cover photo helps you recognise your event in Crowd."
        required={true}
        placeholder="Link to your photo..."
      />
    );
  }

  generateMapImageField() {
    return (
      <div className={styles.fileField}>
        <FileField
          className={styles.formGroup}
          label="Map Image"
          labelFor="map-image"
          helperText="Upload a map image to plot your regions on."
          required={true}
          placeholder="Choose map..."
        />
      </div>
    );
  }

  generateMapWidthField() {
    return (
      <NumberField
        className={styles.formGroup}
        label="Map Width in Metres"
        labelFor="map-width"
        helperText="This lets us set up GPS regions, i.e. 10 metres from X on the map"
        required={true}
        icon="path-search"
        placeholder="How wide is your map?"
        min={1}
        max={50000}
      />
    );
  }

  generateSubmitButton() {
    return (
      <div className={styles.submitButtonWrapper}>
        <Button
          className={styles.submitButton}
          rightIcon="chevron-right"
          onClick={this.submitForm}
        >
          Create Event
        </Button>
      </div>
    );
  }

  /* TODO: Actually submit the form and then redirect to the next page. */
  submitForm() {
    alert("Submitted!");
  }
}

export default NewEventForm;
