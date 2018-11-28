import React, { Component } from "react";
import TextField from "../../../UI/TextField/TextField";
import { MultiSelect } from "@blueprintjs/select";
import Button from "../../../UI/Button/Button";
import { MenuItem, Tag } from "@blueprintjs/core";

class SendNotificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      selectedRegions: []
    };
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
          tagRenderer={tag => <Tag>{tag}</Tag>}
          items={["Campsite Bar", "Arena Bar", "Main Stage"]}
          itemRenderer={(item, { modifiers }) => (
            <MenuItem active={modifiers.active} key={item} text={item} />
          )}
          onItemSelect={console.log}
        />
        <br />
        <Button>Submit</Button>
      </section>
    );
  }
}

SendNotificationForm.propTypes = {};

export default SendNotificationForm;
