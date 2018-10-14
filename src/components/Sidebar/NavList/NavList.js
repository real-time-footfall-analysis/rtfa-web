import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavList.module.scss";

class NavList extends Component {
  render() {
    const navItems = this.props.links.map(navItem => (
      <li key={navItem.iconName}>
        <NavListItem {...navItem} changeSelected={this.changeSelected} />
      </li>
    ));
    return <ul className={styles.navList}>{navItems}</ul>;
  }
}

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
        0 {props.shortName ? props.shortName : props.name}
      </span>
    </NavLink>
  );
};

NavListItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  shortName: PropTypes.string,
  iconName: PropTypes.string
};

export default NavList;
