import { Badge, Button, Card, Checkbox } from "../../../../components";
import { cnBEM, createElement } from "../../../../utils";
import "./search-task-card.css";

export const SearchTaskCard = ({
  task = {},
  onToggle,
  onFavorite,
  onArchive,
  onDelete,
  onClick,
} = {}) => {
  const {
    id,
    title = "Untitled Task",
    description = "",
    status = "todo",
    priority = "medium",
    category = "general",
    favorite = false,
    archived = false,
  } = task;

  const isCompleted = status === "completed";

  // Checkbox
  const checkbox = Checkbox({
    className: "search-card__checkbox",
    checked: isCompleted,
    onChange: () => onToggle?.(id),
  });

  // Action Buttons
  const favoriteBtn = Button({
    icon: "star",
    variant: "ghost",
    size: "sm",
    className: cnBEM("search-card__btn", "active", favorite),
    events: {
      click: (e) => {
        e.stopPropagation();
        onFavorite?.(id);
      },
    },
  });

  const archiveBtn = Button({
    icon: archived ? "archive-restore" : "archive",
    variant: "ghost",
    size: "sm",
    className: "search-card__action",
    events: {
      click: (e) => {
        e.stopPropagation();
        onArchive?.(id);
      },
    },
  });

  const deleteBtn = Button({
    icon: "trash-2",
    variant: "ghost",
    className: "search-card__action search-card__action--delete",
    events: {
      click: (e) => {
        e.stopPropagation();
        onDelete?.(id);
      },
    },
  });

  const mainContent = createElement("div", {
    className: "search-card__main",
    children: [
      createElement("h3", {
        className: cnBEM("search-card__title", "completed", isCompleted),
        textContent: title,
      }),
      description &&
        createElement("p", {
          className: "search-card__desc",
          textContent: description,
        }),
      createElement("div", {
        className: "search-card__badges",
        children: [
          Badge({
            text: priority,
            type: priority,
            size: "lg",
            variant: "subtle",
          }),
          Badge({
            text: category,
            type: category,
            size: "lg",
            variant: "subtle",
          }),
        ],
      }),
    ].filter(Boolean),
  });

  const cardFooter = createElement("div", {
    className: "search-card__footer",
    children: [
      createElement("div", {
        className: "search-card__footer-badge",
        children: [
          Badge({
            text: priority,
            type: priority,
            size: "md",
            variant: "subtle",
          }),
          Badge({
            text: category,
            type: category,
            size: "md",
            variant: "subtle",
          }),
        ],
      }),
      createElement("div", {
        className: "search-card__footer-actions",
        children: [favoriteBtn, archiveBtn, deleteBtn],
      }),
    ],
  });

  const cardBody = createElement("div", {
    className: "search-card__body-wrapper",
    children: [checkbox, mainContent, cardFooter],
  });

  return Card({
    className: cnBEM("search-card", "completed", isCompleted),
    events: {
      click: (e) => {
        if (e.target.closest("buttons,input,label")) return;
        onClick?.(task);
      },
    },
    children: [cardBody],
  });
};
