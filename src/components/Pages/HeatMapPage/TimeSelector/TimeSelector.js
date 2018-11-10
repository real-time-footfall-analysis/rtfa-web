import React, { Component } from "react";
import PropTypes from "prop-types";
import { Slider } from "@blueprintjs/core";

export class TimeSelector extends Component {
  render() {
    return (
      <Slider
        min={0}
        max={10}
        stepSize={1}
        labelStepSize={10}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}

TimeSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
};
