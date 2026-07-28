import "./task-detail.css";
import { TaskController } from "../../features/tasks/controller";
import {
  capitalize,
  cnBEM,
  createElement,
  escapeHTML,
  formatRelativeDate,
  isOverdue,
  select,
} from "../../utils";
import { Button } from "../button/Button";
import { Chip } from "../chip/Chip";

export const TaskDetail = (props = {}) => {
  const { task = {}, onClose, onEdit, onDelete } = props;

  let isFavorite = Boolean(task.isFavorite);
  let subtasksList = [...(task.subtasks || [])];

  const btnFavClass = cnBEM("task-detail__fav-btn", "active", isFavorite);
  const btnFab = Button({
    variant: "ghost",
    className: btnFavClass,
    attributes: { type: "button", title: "Toggle Favorite" },
    icon: "star",
    events: {
      click: () => {
        isFavorite = !isFavorite;
        TaskController.editTask(task.id, { isFavorite });
        btnFab.className = `btn btn--ghost task-detail__fab-btn ${btnFavClass}`;
        const icon = select("i", btnFab);
        if (icon) {
          icon.setAttribute("fill", isFavorite ? "currentColor" : "none");
        }
      },
    },
  });

  const initialStarIcon = select("i", btnFab);
  if (initialStarIcon && isFavorite) {
    initialStarIcon.setAttribute("fill", "currentColor");
  }

  const btnClose = Button({
    variant: "ghost",
    className: "task-detail__close-btn",
    icon: "x",
    attributes: { type: "button", title: "Close" },
    events: { click: onClose },
  });

  const header = createElement("div", {
    className: "task-detail__header",
    children: [
      createElement("span", {
        className: "task-detail__info-label",
        textContent: "Task Details",
      }),
      createElement("div", {
        className: "task-detail__header-actions",
        children: [btnFab, btnClose],
      }),
    ],
  });

  const categoryChip = Chip({
    id: task.category || "work",
    label: escapeHTML(capitalize(task.category || "Work")),
    selected: true,
    variant: "category",
  });

  const priorityChip = Chip({
    id: task.priority || "medium",
    label: escapeHTML(capitalize(task.priority || "Medium")),
    selected: true,
    variant: "priority",
  });

  const formattedDueDate = task.dueDate
    ? formatRelativeDate(task.dueDate)
    : "No Date";
  const taskIsOverdue = task.dueDate ? isOverdue(task.dueDate) : false;

  const infoGrid = createElement("div", {
    className: "task-detail__info-grid",
    children: [
      createElement("div", {
        className: "task-detail__info-item",
        children: [
          createElement("span", {
            className: "task-detail__info-label",
            textContent: "Due Date",
          }),
          createElement("div", {
            className: `task-detail__info-value ${taskIsOverdue ? "task-detail__info-value--overdue" : ""}`,
            children: [
              createElement("i", { attributes: { "data-lucide": "calendar" } }),
              createElement("span", {
                textContent: escapeHTML(formattedDueDate),
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        className: "task-detail__info-item",
        children: [
          createElement("span", {
            className: "task-detail__info-label",
            textContent: "Time",
          }),
          createElement("div", {
            className: "task-detail__info-value",
            children: [
              createElement("i", { attributes: { "data-lucide": "clock" } }),
              createElement("span", {
                textContent: escapeHTML(task.time || "10:00 AM"),
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const descriptionSection = createElement("div", {
    className: "task-detail__section",
    children: [
      createElement("span", {
        className: "task-detail__section-title",
        textContent: "Description",
      }),
      createElement("p", {
        className: "task-detail__description",
        textContent: escapeHTML(task.description || "No description provided."),
      }),
    ],
  });

  const subtasksContainer = createElement("div", {
    className: "task-detail__subtasks",
  });

  const renderSubtasks = () => {
    subtasksContainer.innerHTML = "";
    if (!subtasksList || subtasksList.length === 0) {
      subtasksContainer.append(
        createElement("span", {
          className: "task-detail__description",
          textContent: "No subtasks.",
        }),
      );
      return;
    }

    subtasksList.forEach((st, index) => {
      const isDone = typeof st === "object" ? st.completed : false;
      const title = typeof st === "object" ? st.title : st;

      const itemClass = cnBEM(
        "task-detail__subtasks-item",
        "completed",
        isDone,
      );
      const itemEl = createElement("label", {
        className: itemClass,
        children: [
          createElement("input", {
            className: "task-detail__checkbox",
            attributes: {
              type: "checkbox",
              ...(isDone ? { checked: true } : {}),
            },
            events: {
              change: (e) => {
                const checked = e.target.checked;
                if (typeof subtasksList[index] === "object") {
                  subtasksList[index].completed = checked;
                } else {
                  subtasksList[index] = { title, completed: checked };
                }
                TaskController.editTask(task.id, { subtasks: subtasksList });
                renderSubtasks();
              },
            },
          }),
          createElement("span", { textContent: escapeHTML(title) }),
        ],
      });
      subtasksContainer.append(itemEl);
    });
  };

  renderSubtasks();

  const subtasksSection = createElement("div", {
    className: "task-detail__section",
    children: [
      createElement("span", {
        className: "task-detail__section-title",
        textContent: `Subtasks (${subtasksList.filter((s) => (typeof s === "object" ? s.completed : false)).length}/${subtasksList.length})`,
      }),
      subtasksContainer,
    ],
  });

  const body = createElement("div", {
    className: "task-detail__body",
    children: [
      createElement("h2", {
        className: "task-detail__title",
        textContent: escapeHTML(task.title || "Untitled Task"),
      }),
      createElement("div", {
        className: "task-detail__tags",
        children: [categoryChip, priorityChip],
      }),
      infoGrid,
      descriptionSection,
      subtasksSection,
    ],
  });

  const btnEdit = Button({
    variant: "secondary",
    icon: "edit-3",
    text: "Edit Task",
    className: "task-detail__btn-action",
    events: {
      click: () => {
        if (onEdit) onEdit(task);
        onClose();
      },
    },
  });

  const btnDelete = Button({
    variant: "danger",
    icon: "trash-2",
    text: "Delete Task",
    className: "task-detail__btn-action",
    events: {
      click: () => {
        if (onDelete) onDelete(task);
        onClose();
      },
    },
  });

  const footer = createElement("div", {
    className: "task-detail__footer",
    children: [btnEdit, btnDelete],
  });

  const panel = createElement("div", {
    className: "task-detail-panel",
    events: { click: (e) => e.stopPropagation() },
    children: [header, body, footer],
  });

  const overlayClass = cnBEM("task-detail-overlay", "open", true);
  const overlay = createElement("div", {
    className: overlayClass,
    events: { click: onClose },
    children: [panel],
  });

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return overlay;
};
