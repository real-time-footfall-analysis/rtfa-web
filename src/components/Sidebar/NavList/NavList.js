import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './NavList.module.scss'

class NavList extends Component {

  constructor (props) {
    super(props)
    this.navList = [
      {
        itemName: 'Events',
        iconName: 'calendar',
      },
      {
        itemName: 'Maps',
        iconName: 'map',
      },
      {
        itemName: 'Region Groups',
        iconName: 'layer-group',
        shortName: 'Groups',
      },
      {
        itemName: 'Regions',
        iconName: 'object-ungroup',
      },
    ]
    this.state = {selectedItem: this.navList[0].itemName}
    this.changeSelected = this.changeSelected.bind(this);
  }

  changeSelected (newSelection) {
    this.setState({
      selectedItem: newSelection,
    })
  }

  render () { // eslint-disable-line
    const navItems = this.navList.map((navItem) =>
      <li key={navItem.iconName}>
        <NavListItem {...navItem}
                     isSelected={this.state.selectedItem === navItem.itemName}
                     changeSelected={this.changeSelected}
        />
      </li>
    )
    return (
      <ul className={styles.navList}>
        {navItems}
      </ul>
    )
  }
}

const NavListItem = (props) => {
  return (
    <a className={styles.navListItem + ' ' +
    (props.isSelected ? styles.selected : '')}
       onClick={() => props.changeSelected(props.itemName)}>
      <i className={'far fa-' + props.iconName}/>
      <span className={styles.itemName}>{props.itemName}</span>
      <span className={styles.itemCount}>
        0 {props.shortName ? props.shortName : props.itemName}
      </span>
    </a>
  )
}

NavListItem.defaultProps = {
  isSelected: false
}

NavListItem.propTypes = {
  iconName: PropTypes.string,
  itemName: PropTypes.string,
  shortName: PropTypes.string,
  isSelected: PropTypes.bool,
  changeSelected: PropTypes.func
}

export default NavList
