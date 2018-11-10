import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = props => {
  let element = (
    <button
      className={`${styles.button} ${props.fill ? styles.fill : ""} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {insertIconIfProvided(props.leftIcon, styles.leftIcon)}
      {props.children}
      {insertIconIfProvided(props.rightIcon, styles.rightIcon)}
    </button>
  );
  /* Wrap in a link if needed. */
  if (props.path) {
    element = <Link to={props.path}>{element}</Link>;
  }
  return element;
};

Button.propTypes = {
  children: PropTypes.node,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onClick: PropTypes.func
};

const insertIconIfProvided = (iconName, className) => {
  return iconName ? <i className={`fa fa-${iconName} ${className}`} /> : null;
};

export default Button;
