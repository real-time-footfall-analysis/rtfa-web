import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import NavList from "./NavList/NavList";
import EventSelector from "./EventSelector/EventSelector";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: this.props.events[0]
    };
  }

  handleEventChange(event) {
    this.setState({
      selectedEvent: event
    });
  }

  render() {
    return (
      <nav className={styles.sidebar}>
        <Link to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>

        <div className={styles.eventSelector}>
          <EventSelector
            events={this.props.events}
            handleValueChange={this.handleEventChange}
          />
        </div>

        <NavList {...this.props} />
      </nav>
    );
  }
}

Sidebar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
};

export default Sidebar;
