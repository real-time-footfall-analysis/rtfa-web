import React from "react";
import PropTypes from "prop-types";
import { Overlay } from "@blueprintjs/core";
import { CARD, ELEVATION_4 } from "@blueprintjs/core/lib/cjs/common/classes";

import "./SendNotificationFormOverlay.module.scss";

import SendNotificationForm from "../SendNotificationForm/SendNotificationForm";

export const SendNotificationFormOverlay = props => {
  const { visible, selectedEventID, regions, onClose, onSubmit } = props;
  return (
    <Overlay isOpen={visible} onClose={onClose} hasBackdrop={true}>
      <div className={`overlay ${CARD} ${ELEVATION_4}`}>
        <SendNotificationForm
          eventID={selectedEventID}
          regions={regions}
          onSubmit={onSubmit}
        />
      </div>
    </Overlay>
  );
};

SendNotificationFormOverlay.propTypes = {
  selectedEventID: PropTypes.number,
  regions: PropTypes.array,
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
