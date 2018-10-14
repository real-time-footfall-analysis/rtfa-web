import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import styles from "./EventSelector.module.scss";

class EventSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedEvent: this.props.events[0] };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.setState({ selectedEvent: event });
  }

  render() {
    return (
      <Select
        className={styles.select}
        items={this.props.events}
        itemRenderer={renderEvents}
        filterable={false}
        onItemSelect={this.handleValueChange}
      >
        <Button
          large={true}
          text={this.state.selectedEvent.name}
          icon="calendar"
          rightIcon="double-caret-vertical"
        />
      </Select>
    );
  }
}

EventSelector.propTypes = {
  events: PropTypes.arrayOf(PropTypes.number)
};

const renderEvents = (event, { handleClick }) => {
  return <MenuItem text={event.name} onClick={handleClick} />;
};

export default EventSelector;
