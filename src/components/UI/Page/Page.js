import React from "react";
import PropTypes from "prop-types";
import styles from "./Page.module.scss";

export const Page = props => {
  return (
    <div className={props.flex ? styles.flexContainer : ""}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.description ? (
        <p className={styles.description}>{props.description}</p>
      ) : (
        ""
      )}
      <div className={styles.pageContent}>{props.children}</div>
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.element,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  flex: PropTypes.bool
};

export default Page;
