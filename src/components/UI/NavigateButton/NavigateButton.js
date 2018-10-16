import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { withRouter } from "react-router-dom";

const NavigateButton = withRouter(props => (
  <Button
    className={props.className}
    rightIcon={props.rightIcon}
    onClick={() => {
      props.onClick();
      props.history.push(props.navigateToRoute);
    }}
  >
    {props.text}
  </Button>
));

NavigateButton.defaultProps = {
  rightIcon: "chevron-right"
};

NavigateButton.propTypes = {
  onClick: PropTypes.func,
  navigateToRoute: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string
};

export default NavigateButton;
