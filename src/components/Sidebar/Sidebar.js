import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";
import { Link } from "react-router-dom";

const Sidebar = props => {
  return (
    <nav className={styles.sidebar}>
      <Link to="/">
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>

      <NavList {...props} />
    </nav>
  );
};

export default Sidebar;
