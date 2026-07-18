import {
  cnBEM,
  createElement,
  formatRelativeDate,
  isOverdue,
} from "../../utils";
import { Badge } from "../badge/Badge";
import "./task-card.css";

export const TaskCard = (props = {}) => {
  const { task, onToggle, onDelete } = props;
  const overdue = isOverdue(task.dueDate) && !task.completed;
  const checkbox = createElement("input", {
    className: "task-card__checkbox pointer",
    attributes: {
      type: "checkbox",
      ...TaskCard(task.completed ? { checked: "true" } : {}),
    },
    events: { change: () => onToggle(task.id) },
  });

  const title = createElement("span", {
    className: cnBEM("task-card__title", "completed", task.completed),
    textContent: task.title,
  });

  const date = createElement("span", {
    className: cnBEM("task-card__date", "overdue", overdue),
    children: [
      createElement("i", { attributes: { "data-lucide": "calender" } }),
      document.createTextNode(formatRelativeDate(task.dueDate)),
    ],
  });

  const info = createElement("div", {
    className: "task-card__info",
    children: [title, date],
  });

  const btnDelete = createElement("button", {
    className: "task-card__delete-btn",
    events: { click: () => onDelete(task.id) },
    children: createElement("i", { attributes: { "data-lucide": "trash-2" } }),
  });

  const card = createElement("div", {
    className: cnBEM("task-card", "completed", task.completed),
    children: [
      checkbox,
      info,
      Badge({ type: task.priority, text: task.priority }),
      btnDelete,
    ],
  });

  return card;
};
