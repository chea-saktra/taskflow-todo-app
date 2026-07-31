import { TaskController } from "../../features/tasks/controller";
import {
  cnBEM,
  createElement,
  formatRelativeDate,
  isOverdue,
  openTaskDetailModal,
} from "../../utils";
import { Badge } from "../badge/Badge";
import { Dropdown } from "../dropdown/Dropdown";
import "./task-card.css";

export const TaskCard = (props = {}) => {
  const {
    task = {},
    onToggle,
    onFavorite,
    onEdit,
    onArchive,
    onDelete,
    isFavoritesView = false,
    isCompletedView = false,
  } = props; 

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

  if (!isCompletedView && task.dueDate) {
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

  const taskState = task.completed ? "Completed" : task.status || "Pending";
  if (taskState) {
    metaChildren.push(
      Badge({
        type: taskState.toLowerCase().replace(" ", "-"),
        text: taskState,
      }),
    );
  }

  const metaRow = createElement("div", {
    className: "task-card__meta",
    children: metaChildren,
  });

  const content = createElement("div", {
    className: "task-card__content",
    events: {
      click: () => {
        openTaskDetailModal(task);
      },
    },
    children: [title, metaRow],
  });

  const actionChildren = [];
  const isFav = task.isFavorite || task.starred;

  if (isFavoritesView) {
    const btnFavorite = createElement("button", {
      className: `task-card__star-btn ${isFav ? "is-favorite" : ""}`,
      attributes: { "aria-label": isFav ? "Unstar task" : "Star task" },
      events: {
        click: (e) => {
          e.stopPropagation();
          if (onFavorite) onFavorite(task.id);
        },
      },
      children: [
        createElement("i", {
          attributes: {
            "data-lucide": "star",
            fill: "#f59e0b",
            stroke: "#f59e0b",
          },
        }),
      ],
    });
    actionChildren.push(btnFavorite);
  } else if (isCompletedView) {
    const completedDateText = task.completedAt
      ? formatRelativeDate(task.completedAt)
      : task.dueDate
        ? formatRelativeDate(task.dueDate)
        : "Completed";

    const completedDateDisplay = createElement("span", {
      className: "task-card__date task-card__date--completed",
      children: [
        createElement("i", {
          attributes: { "data-lucide": "calendar-check" },
        }),
        document.createTextNode(completedDateText),
      ],
    });
    actionChildren.push(completedDateDisplay);
  } else {
    const btnTrigger = createElement("button", {
      className: "task-card__action-btn",
      attributes: { "aria-label": "More options" },
      children: createElement("i", {
        attributes: { "data-lucide": "more-vertical" },
      }),
    });

    const actionDropdown = Dropdown({
      trigger: btnTrigger,
      align: "right",
      items: [
        {
          label: task.favorite ? "Unstar" : "Star",
          icon: "star",
          onClick: () => onFavorite && onFavorite(task.id),
        },
        {
          label: "Edit",
          icon: "edit-3",
          onClick: () => onEdit && onEdit(task),
        },
        {
          label: task.isAcrhived ? "Unarchive" : "Archive",
          icon: task.isAcrhived ? "archive-restore" : "archive",
          onClick: () => onArchive && onArchive(task.id),
        },
        {
          label: "Delete",
          icon: "trash-2",
          isDanger: true,
          onClick: () => onDelete && onDelete(task.id),
        },
      ],
    });
    actionChildren.push(actionDropdown);
  }

  const actionContainer = createElement("div", {
    className: "task-card__actions",
    children: actionChildren,
  });

  const card = createElement("article", {
    className: cnBEM("task-card", "completed", task.completed),
    children: [checkbox, content, actionContainer],
  });

  return card;
};
