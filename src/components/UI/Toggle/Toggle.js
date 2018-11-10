import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@blueprintjs/core";

const Toggle = props => {
  return (
    <ButtonGroup>
      <Button active={props.leftActive} onClick={props.leftClicked}>
        {props.children[0]}
      </Button>
      <Button active={!props.leftActive} onClick={props.rightClicked}>
        {props.children[1]}
      </Button>
    </ButtonGroup>
  );
};

Toggle.propTypes = {
  leftActive: PropTypes.bool,
  leftClicked: PropTypes.func,
  rightClicked: PropTypes.func,
  children: PropTypes.any
};

export default Toggle;
