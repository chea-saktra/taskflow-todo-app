import { Badge } from "../../../../components";
import { createElement } from "../../../../utils";

export const TaskDetailInfo = ({ task = {} } = {}) => {
  const createInfoItem = (label, badgeProps, isBadge = true) => {
    return createElement("div", {
      className: "task-detail__info-item",
      children: [
        createElement("span", {
          className: "task-detail__info-label",
          textContent: label,
        }),
        isBadge
          ? Badge(badgeProps)
          : createElement("span", {
              className: "task-detail__info-value",
              textContent: badgeProps,
            }),
      ],
    });
  };

  const getValue = (labelKey, key) => task[`${key}Label`] || task[key] || "-";
  const displayDueDate =
    task.dueDateLabel || (task.dueDate ? task.dueDate : "No due date");
  return createElement("div", {
    className: "task-detail__info",
    children: [
      createInfoItem("Category", {
        type: task.category,
        text: getValue("Category", "category"),
      }),

      createInfoItem("Priority", {
        type: task.priority,
        text: getValue("Priority", "priority"),
      }),

      createInfoItem("Status", {
        type: task.status,
        text: getValue("Status", "status"),
      }),

      createInfoItem("Due Date", displayDueDate, false),
    ],
  });
};
