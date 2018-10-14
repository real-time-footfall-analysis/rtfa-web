import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = props => {
  let element = (
    <button className={styles.button}>
      <i className={`fa fa-${props.iconName}`} />
      {props.children}
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
  iconName: PropTypes.string
};

export default Button;
