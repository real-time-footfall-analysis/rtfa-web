import React, { Component } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@blueprintjs/select";
import { FormGroup, Icon, MenuItem } from "@blueprintjs/core";
import _ from "lodash";

import TextField from "../../../UI/TextField/TextField";
import Button from "../../../UI/Button/Button";
import { currentTimestamp } from "../../../../utils";

import styles from "./SendNotificationForm.module.scss";

class SendNotificationForm extends Component {
  static propTypes = {
    eventID: PropTypes.number,
    regions: PropTypes.object,
    onSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      selectedRegions: []
    };
    this.initialState = this.state;
    this.regionIDToName = this.regionIDToName.bind(this);
    this.handleRegionSelect = this.handleRegionSelect.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
    this.isRegionSelected = this.isRegionSelected.bind(this);
    this.renderRegionListEntry = this.renderRegionListEntry.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.eventID !== this.props.eventID) {
      this.setState(this.initialState);
    }
  }

  regionIDToName(regionID) {
    const { regions } = this.props;
    return regions[regionID] ? regions[regionID].name : `Region ${regionID}`;
  }

  isRegionSelected(regionID) {
    return _.includes(this.state.selectedRegions, regionID);
  }

  selectRegion(selectedRegion) {
    return this.setState({
      selectedRegions: [...this.state.selectedRegions, selectedRegion]
    });
  }

  deselectRegion(selectedRegion) {
    return this.setState({
      selectedRegions: this.state.selectedRegions.filter(
        region => region !== selectedRegion
      )
    });
  }

  handleRegionSelect(selectedRegion) {
    if (!this.isRegionSelected(selectedRegion)) {
      this.selectRegion(selectedRegion);
    } else {
      this.deselectRegion(selectedRegion);
    }
  }

  handleTagRemove(tagContent) {
    const regionIDToRemove = _.filter(
      this.props.regions,
      region => region.name === tagContent
    )[0].regionID;
    this.deselectRegion(regionIDToRemove);
  }

  /* Sets all fields in the form to blank values. */
  clearForm() {
    this.setState(this.initialState);
  }

  renderFormTitle() {
    return (
      <h2 className={styles.formTitle}>
        <Icon
          icon="add"
          tagName="span"
          style={{
            verticalAlign: "baseline",
            marginRight: 7
          }}
        />
        Send New Notification
      </h2>
    );
  }

  renderTitleField() {
    return (
      <TextField
        label="Title"
        icon="edit"
        value={this.state.title}
        placeholder="Enter your notification's title..."
        onChange={event => this.setState({ title: event.target.value })}
      />
    );
  }

  renderDescriptionField() {
    return (
      <TextField
        label="Description"
        icon="align-left"
        value={this.state.description}
        placeholder="Enter your notification's description"
        onChange={event => this.setState({ description: event.target.value })}
      />
    );
  }

  renderRegionSelectField() {
    return (
      <FormGroup
        label="Target Regions"
        helperText="Select the regions that you want to send notifications to."
      >
        {this.renderRegionSelector()}
      </FormGroup>
    );
  }

  doesRegionIDMatchQuery = (query, regionID) =>
    this.regionIDToName(regionID)
      .toLowerCase()
      .indexOf(query.toLowerCase()) >= 0;

  renderRegionSelector() {
    return (
      <MultiSelect
        placeholder="Search for regions..."
        tagRenderer={this.regionIDToName}
        tagInputProps={{
          onRemove: this.handleTagRemove,
          leftIcon: "geosearch"
        }}
        items={this.getRegionIDs()}
        noResults="No Regions Found"
        itemRenderer={this.renderRegionListEntry}
        resetOnSelect={true}
        itemPredicate={this.doesRegionIDMatchQuery}
        selectedItems={this.state.selectedRegions}
        onItemSelect={this.handleRegionSelect}
      />
    );
  }

  getRegionIDs() {
    return _.map(this.props.regions, region => region.regionID);
  }

  renderRegionListEntry(regionID, { modifiers, handleClick }) {
    return (
      <MenuItem
        active={modifiers.active}
        key={regionID}
        icon={this.isRegionSelected(regionID) ? "tick" : "blank"}
        text={this.regionIDToName(regionID)}
        onClick={handleClick}
      />
    );
  }

  /* TODO: The onClick handler here should be a function called handleFormSubmit
   *        but there were some bugs with .bind(this) */
  renderSubmitButton() {
    const { eventID, onSubmit } = this.props;
    return (
      <Button
        fill={true}
        onClick={() => {
          this.clearForm();
          onSubmit(eventID, this.notification());
        }}
      >
        Submit
      </Button>
    );
  }

  /* @returns A notification object based on the current values of the fields
   *          in the form. */
  notification() {
    const { title, description, selectedRegions } = this.state;
    return {
      title: title,
      description: description,
      regionIDs: selectedRegions,
      occurredAt: currentTimestamp()
    };
  }

  render() {
    return (
      <section className={styles.sendNotificationForm}>
        {this.renderFormTitle()}
        {this.renderTitleField()}
        {this.renderDescriptionField()}
        {this.renderRegionSelectField()}
        {this.renderSubmitButton()}
      </section>
    );
  }
}

export default SendNotificationForm;
