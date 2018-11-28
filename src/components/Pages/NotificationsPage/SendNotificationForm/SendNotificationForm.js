import React, { Component } from "react";
import { MultiSelect } from "@blueprintjs/select";
import { FormGroup, Icon, MenuItem } from "@blueprintjs/core";
import _ from "lodash";
import PropTypes from "prop-types";
import TextField from "../../../UI/TextField/TextField";
import Button from "../../../UI/Button/Button";
import styles from "./SendNotificationForm.module.scss";

class SendNotificationForm extends Component {
  static propTypes = {
    regions: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      selectedRegions: []
    };
    this.regionIDToName = this.regionIDToName.bind(this);
    this.handleRegionSelect = this.handleRegionSelect.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
    this.isRegionSelected = this.isRegionSelected.bind(this);
    this.renderRegionListEntry = this.renderRegionListEntry.bind(this);
  }

  regionIDToName(regionID) {
    return this.props.regions[regionID]
      ? this.props.regions[regionID].name
      : `Region ${regionID}`;
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

  render() {
    return (
      <section className={styles.sendNotificationForm}>
        {this.renderFormTitle()}
        {this.renderTitleField()}
        {this.renderDescriptionField()}
        {this.renderRegionSelectField()}
        <Button fill={true}>Submit</Button>
      </section>
    );
  }
}

SendNotificationForm.propTypes = {};

export default SendNotificationForm;
