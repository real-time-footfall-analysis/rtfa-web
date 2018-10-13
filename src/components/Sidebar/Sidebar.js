import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";

const Sidebar = props => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo className={styles.logo} />
      </div>

      <NavList {...props} />
    </nav>
  );
};

export default Sidebar;
