import React, { Component } from "react";
import { MultiSelect } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";
import _ from "lodash";
import PropTypes from "prop-types";
import TextField from "../../../UI/TextField/TextField";
import Button from "../../../UI/Button/Button";

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
  }

  regionIDToName(regionID) {
    return this.props.regions[regionID]
      ? this.props.regions[regionID].name
      : `Region ${regionID}`;
  }

  render() {
    return (
      <section>
        <h2>Send New Notification</h2>
        <TextField
          label="Title"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <TextField
          label="Description"
          value={this.state.description}
          onChange={event => this.setState({ description: event.target.value })}
        />
        <MultiSelect
          tagRenderer={this.regionIDToName}
          items={_.map(this.props.regions, region => region.regionID)}
          itemRenderer={(regionID, { modifiers, handleClick }) => (
            <MenuItem
              active={modifiers.active}
              key={regionID}
              text={this.regionIDToName(regionID)}
              onClick={handleClick}
            />
          )}
          selectedItems={this.state.selectedRegions}
          onItemSelect={selectedRegion => {
            this.setState({
              selectedRegions: [...this.state.selectedRegions, selectedRegion]
            });
          }}
        />
        <br />
        <Button>Submit</Button>
      </section>
    );
  }
}

SendNotificationForm.propTypes = {};

export default SendNotificationForm;
