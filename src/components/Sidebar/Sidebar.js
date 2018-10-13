import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo className={styles.logo} />
      </div>

      <NavList />
    </nav>
  );
};

export default Sidebar;
