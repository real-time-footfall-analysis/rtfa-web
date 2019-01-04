import React from "react";
import _ from "lodash";

import { TASKS_METADATA } from "../../../../../constants";

export const renderTask = (task, regionID) => {
  const taskMetadata = TASKS_METADATA[task.taskID];
  if (!task.result || _.isEmpty(task.result)) {
    return null;
  }
  return React.createElement(taskMetadata.component, {
    ...taskMetadata.props,
    taskValue: task.result[regionID],
    key: task.taskID
  });
};
