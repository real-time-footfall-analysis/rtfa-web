import React, { Component } from "react";
import PropTypes from "prop-types";
import { Slider } from "@blueprintjs/core";
// es-lint-disable-next-line
import "./TimeSelector.module.scss";

export class TimeSelector extends Component {
  render() {
    return <Slider {...this.props} />;
  }
}

TimeSelector.defaultProps = {
  min: 0,
  step: 1
};

TimeSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
};
