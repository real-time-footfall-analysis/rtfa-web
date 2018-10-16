import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import styles from "./EventSelector.module.scss";

class EventSelector extends Component {
  constructor(props) {
    super(props);
    this.handleEventSelection = this.handleEventSelection.bind(this);
  }

  handleEventSelection(event) {
    this.props.handleEventSelection(event);
  }

  render() {
    const eventList = _.map(this.props.events, (event, eventID) => {
        return { ...event, id: eventID };
      }),
      selectedEvent = this.props.events[this.props.selectedEventID],
      selectedEventName = selectedEvent ? selectedEvent.name : "";
    return (
      <Select
        className={styles.select}
        items={eventList}
        itemRenderer={renderEvents}
        filterable={false}
        onItemSelect={this.handleEventSelection}
      >
        <Button
          large={true}
          text={selectedEventName}
          icon="calendar"
          rightIcon="double-caret-vertical"
        />
      </Select>
    );
  }
}

EventSelector.propTypes = {
  events: PropTypes.object,
  selectedEventID: PropTypes.string,
  handleEventSelection: PropTypes.func
};

const renderEvents = (event, { handleClick }) => {
  return <MenuItem key={event.id} text={event.name} onClick={handleClick} />;
};

export default EventSelector;
