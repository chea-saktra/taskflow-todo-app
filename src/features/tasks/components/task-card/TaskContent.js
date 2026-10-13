import { TASK_STATUS } from "../../../../constants";
import { cnBEM, createElement } from "../../../../utils";
import { TaskMeta } from "./TaskMeta";

export const TaskContent = ({ task } = {}) => {
  const isCompleted = task.status === TASK_STATUS.COMPLETED;
  return createElement("div", {
    className: "task-card__content",
    children: [
      createElement("h3", {
        className: cnBEM("task-card__title", "completed", isCompleted),
        textContent: task.title,
      }),
      TaskMeta({ task }),
    ],
  });
};
