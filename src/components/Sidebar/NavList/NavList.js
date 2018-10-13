import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavList.module.scss";

class NavList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: this.props.links[0].name };
    this.changeSelected = this.changeSelected.bind(this);
  }

  changeSelected(newSelection) {
    this.setState({
      selectedItem: newSelection
    });
  }

  render() {
    const navItems = this.props.links.map(navItem => (
      <li key={navItem.iconName}>
        <NavListItem
          {...navItem}
          isSelected={this.state.selectedItem === navItem.itemName}
          changeSelected={this.changeSelected}
        />
      </li>
    ));
    return <ul className={styles.navList}>{navItems}</ul>;
  }
}

const NavListItem = props => {
  return (
    <NavLink
      exact={true}
      to={props.path}
      className={styles.navListItem}
      activeClassName={styles.selected}
      onClick={() => props.changeSelected(props.name)}
    >
      <i className={"far fa-" + props.iconName} />
      <span className={styles.name}>{props.name}</span>
      <span className={styles.itemCount}>
        0 {props.shortName ? props.shortName : props.name}
      </span>
    </NavLink>
  );
};

NavListItem.defaultProps = {
  isSelected: false
};

NavListItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  shortName: PropTypes.string,
  iconName: PropTypes.string,
  isSelected: PropTypes.bool,
  changeSelected: PropTypes.func
};

export default NavList;
