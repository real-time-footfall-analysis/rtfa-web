import React from "react";
import PropTypes from "prop-types";
import styles from "./Page.module.scss";

export const Page = props => {
  return (
    <div>
      <h1 className={styles.title}>{props.title}</h1>
      {props.description ? <p>{props.description}</p> : ""}
      <div className="pageContent">{props.children}</div>
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.element,
  description: PropTypes.string,
  children: PropTypes.element
};

export default Page;
