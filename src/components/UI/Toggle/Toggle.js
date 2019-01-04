import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@blueprintjs/core";

const Toggle = props => {
  return (
    <ButtonGroup>
      <Button
        disabled={props.disabled}
        active={props.leftActive}
        onClick={props.onLeftSelect}
      >
        {props.children[0]}
      </Button>
      <Button
        disabled={props.disabled}
        active={!props.leftActive}
        onClick={props.onRightSelect}
      >
        {props.children[1]}
      </Button>
    </ButtonGroup>
  );
};

Toggle.propTypes = {
  leftActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onLeftSelect: PropTypes.func,
  onRightSelect: PropTypes.func,
  children: PropTypes.any
};

export default Toggle;
