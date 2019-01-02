import React from "react";
import { NavLink } from "react-router-dom";
import * as PropTypes from "prop-types";
import styles from "./NavList.module.scss";

const NavList = props => {
  const navItems = props.links.map(navItem => (
    <li key={navItem.path}>
      <NavListItem {...navItem} selectedEvent={props.selectedEvent} />
    </li>
  ));
  return <ul className={styles.navList}>{navItems}</ul>;
};

const NavListItem = props => {
  return (
    <NavLink
      to={props.path}
      className={styles.navListItem}
      activeClassName={styles.selected}
    >
      <i className={"far fa-" + props.iconName} />
      <span className={styles.name}>{props.name}</span>
      <span className={styles.itemCount}>
        {props.itemCounter(props.selectedEvent)}{" "}
        {props.shortName ? props.shortName : props.name}
      </span>
    </NavLink>
  );
};

NavList.propTypes = {
  events: PropTypes.object,
  handleEventSelection: PropTypes.func,
  links: PropTypes.array,
  selectedEvent: PropTypes.object
};

NavListItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  shortName: PropTypes.string,
  iconName: PropTypes.string,
  itemCounter: PropTypes.func,
  selectedEvent: PropTypes.object
};

export default NavList;
