import { Badge } from "../../../../components";
import { cnBEM, createElement } from "../../../../utils";
import { getTaskMeta } from "../../config/taskConfig";

export const TaskMeta = ({ task } = {}) => {
  const metaList = getTaskMeta(task);
  const children = metaList.map((item) =>
    Badge({
      type: item.type,
      text: item.text,
    }),
  );

  if (task.dueDate) {
    children.push(
      createElement("span", {
        className: cnBEM("task-card__date", "overdue", task.overdue),
        textContent: task.dueDateLabel,
      }),
    );
  }

  return createElement("div", {
    className: "task-card__meta",
    children,
  });
};
