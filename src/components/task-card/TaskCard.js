import {
  cnBEM,
  createElement,
  formatRelativeDate,
  isOverdue,
} from "../../utils";
import { Badge } from "../badge/Badge";
import "./task-card.css";

export const TaskCard = (props = {}) => {
  const { task = {}, onToggle, onAction } = props;

  const overdue = isOverdue(task.dueDate) && !task.completed;

  const checkbox = createElement("input", {
    className: "task-card__checkbox pointer",
    attributes: {
      type: "checkbox",
      ...(task.completed ? { checked: true } : {}),
    },
    events: { change: (e) => onToggle && onToggle(task.id, e.target.checked) },
  });

  const title = createElement("h4", {
    className: `text-truncate ${cnBEM(
      "task-card__title",
      "completed",
      task.completed,
    )}`,
    textContent: task.title,
  });

  const metaChildren = [];

  if (task.category) {
    metaChildren.push(Badge({ type: task.category, text: task.category }));
  }

  if (task.priority) {
    metaChildren.push(Badge({ type: task.priority, text: task.priority }));
  }
  if (task.dueDate) {
    metaChildren.push(
      createElement("span", {
        className: cnBEM("task-card__date", "overdue", overdue),
        children: [
          createElement("i", { attributes: { "data-lucide": "calendar" } }),
          document.createTextNode(formatRelativeDate(task.dueDate)),
        ],
      }),
    );
  }

  const metaRow = createElement("div", {
    className: "task-card__meta",
    children: metaChildren,
  });

  const content = createElement("div", {
    className: "task-card__content",
    children: [title, metaRow],
  });

  const BtnAction = createElement("button", {
    className: "task-card__action-btn",
    attributes: { "aria-label": "More options" },
    events: {
      click: (e) => {
        e.stopPropagation();
        if (onAction) onAction(task, e);
      },
    },
    children: createElement("i", {
      attributes: { "data-lucide": "more-vertical" },
    }),
  });

  const card = createElement("article", {
    className: cnBEM("task-card", "completed", task.completed),
    children: [checkbox, content, BtnAction],
  });

  return card;
};
