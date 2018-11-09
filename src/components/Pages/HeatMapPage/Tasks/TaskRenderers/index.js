import React from "react";
import { TASKS_METADATA } from "../../../../../constants";

export const renderTask = (task, regionID) => {
  const taskMetadata = TASKS_METADATA[task.taskID];
  console.log(task);
  console.log(regionID);
  return React.createElement(taskMetadata.component, {
    ...taskMetadata.props,
    taskValue: task.result[regionID],
    key: task.taskID
  });
};
