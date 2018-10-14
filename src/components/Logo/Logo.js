import React from "react";
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <span className={styles.logoContainer}>
      <i className={styles.icon + " fa fa-users"} />
      <h1 className={styles.appName}>Crowd</h1>
    </span>
  );
};

export default Logo;
