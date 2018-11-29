export class TaskTransformers {
  static popularTimes(taskData) {
    return {
      ...taskData,
      result: {
        ...taskData.result.counts
      }
    };
  }
}
