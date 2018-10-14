import React from "react";
import PropTypes from "prop-types";
import styles from "./PhotoText.module.scss";

const PhotoText = props => {
  console.log(props);
  return (
    <div className={styles.photoBG}>
      <img src={props.imageURL} />
      <div className={styles.imageOverlay} />
      <h2>{props.text}</h2>
    </div>
  );
};

PhotoText.propTypes = {
  imageURL: PropTypes.string,
  text: PropTypes.string
};

export default PhotoText;
