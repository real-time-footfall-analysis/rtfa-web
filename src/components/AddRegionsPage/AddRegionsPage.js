import React from "react";
import PropTypes from "prop-types";
import Page from "../Page/Page";

export const AddRegionsPage = props => {
  return (
    <Page title={<span>{props.name}</span>} description={props.description} />
  );
};

AddRegionsPage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
};

export default AddRegionsPage;
