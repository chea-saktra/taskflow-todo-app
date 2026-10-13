import { Button } from "../../../../components";
import { cnBEM, createElement } from "../../../../utils";

export const TaskDetailHeader = ({
  task = {},
  onClose,
  onEdit,
  onFavorite,
  onArchive,
  onDelete,
} = {}) => {
  const favorite = Boolean(task.favorite);
  const archived = Boolean(task.archived);

  const actions = [
    {
      icon: "star",
      label: favorite ? "Remove from favorites" : "Add to favorites",
      className: cnBEM("task-detail__action", "active", favorite),
      onClick: () => onFavorite?.(task.id),
    },
    {
      icon: "pencil",
      label: "Edit task",
      onClick: () => onEdit?.(task),
    },
    {
      icon: archived ? "archive-restore" : "archive",
      label: archived ? "Unarchive task" : "Archive task",
      onClick: () => onArchive?.(task.id),
    },
    {
      icon: "trash-2",
      label: "Delete task",
      className: "task-detail__action--danger",
      onClick: () => onDelete?.(task.id),
    },
    {
      icon: "x",
      label: "Close",
      onClick: () => onClose?.(),
    },
  ];

  return createElement("header", {
    className: "task-detail__header",
    children: [
      createElement("div", {
        className: "task-detail__heading",
        children: [
          createElement("div", {
            className: "task-detail__status",
            children: [
              createElement("span", {
                className: cnBEM(
                  "task-detail__status-dot",
                  "completed",
                  task.completed,
                ),
              }),
            ],
          }),

          createElement("div", {
            className: "task-detail__title-wrapper",
            children: [
              createElement("h2", {
                className: cnBEM(
                  "task-detail__title",
                  "completed",
                  task.completed,
                ),
                textContent: task.titleLabel || task.title || "",
              }),
              createElement("span", {
                className: "task-detail__status-label",
                textContent: task.statusLabel || "",
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        className: "task-detail__actions",
        children: actions.map(({ icon, label, className = "", onClick }) =>
          Button({
            variant: "ghost",
            icon,
            className: ["task-detail__action", className]
              .filter(Boolean)
              .join(" "),
            attributes: { "aria-label": label },
            events: { click: onClick },
          }),
        ),
      }),
    ],
  });
};
