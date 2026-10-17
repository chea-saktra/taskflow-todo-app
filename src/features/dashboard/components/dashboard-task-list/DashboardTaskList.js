import './dashboard-task-list.css'
import { Card, Chip, EmptyState } from "../../../../components";
import { dateService } from "../../../../services";
import { createElement } from "../../../../utils";
import { getTaskUiProps } from "../../Config/dashboardConfig";

export const DashbaordTaskList = ({
  title = "",
  description = "",
  items = [],
  onItemClick,
  emptyState = {},
  variant = "default",
} = {}) => {
  const content = items.length
    ? createElement("div", {
        className: `dashboard-task-list__list dashboard-task-list__list--${variant}`,
        children: items.map((item) => createItem(item, onItemClick, variant)),
      })
    : EmptyState(emptyState);

  return Card({
    className: `dashboard-task-list dashboard-task-list--${variant}`,
    header: createHeader(title, description),
    children: [content],
  });
};

const createHeader = (title, description) => {
  return createElement("div", {
    className: "dashboard-task-list__heading",
    children: [
      createElement("h2", {
        className: "dashboard-task-list__title",
        textContent: title,
      }),
      createElement("p", {
        className: "dashboard-task-list__description",
        textContent: description,
      }),
    ],
  });
};
const createItem = (item, onItemClick, variant) => {
  if (variant === "activity") {
    const rawDate = item.updatedAt || item.createdAt;
    const formattedDate = dateService.format(rawDate);

    return createElement("div", {
      className:
        "dashboard-task-list__item dashboard-task-list__item--activity",
      children: [
        createElement("div", {
          className: "dashboard-task-list__item-info",
          children: [
            createElement("span", {
              className: "dashboard-task-list__item-title",
              textContent: item.title || "Untitled Task",
            }),
            createElement("span", {
              className: "dashboard-task-list__item-date",
              textContent: formattedDate,
            }),
          ],
        }),
      ],
    });
  }

  const ui = getTaskUiProps(item);
  let metaChips = [];

  if (variant === "overdue") {
    metaChips = [
      ui.dueDateLabel &&
        Chip({
          label: ui.dueDateLabel,
          icon: "mouse-pointer-click",
          id: "today",
          selected: true,
          variant: "danger",
          className: "dashboard-task-list__chip",
        }),
      ui.priorityLabel &&
        Chip({
          label: ui.priorityLabel,
          id: ui.priority,
          selected: true,
          className: "dashboard-task-list__chip",
        }),
    ];
  } else if (variant === "upcoming") {
    metaChips = [
      ui.dueDateLabel &&
        Chip({
          label: ui.dueDateLabel,
          icon: "calendar",
          id: "today",
          selected: true,
          className: "dashboard-task-list__chip",
        }),
      ui.priorityLabel &&
        Chip({
          label: ui.priorityLabel,
          id: ui.priority,
          selected: true,
          className: "dashboard-task-list__chip",
        }),
    ];
  } else if (variant === "favorites") {
    metaChips = [
      ui.statusLabel &&
        Chip({
          label: ui.statusLabel,
          variant: ui.status,
          className: "dashboard-task-list__chip",
        }),
    ];
  } else {
    metaChips = [
      ui.statusLabel &&
        Chip({
          label: ui.statusLabel,
          variant: ui.status,
          className: "dashboard-task-list__chip",
        }),
      ui.dateLabel &&
        Chip({
          label: ui.dateLabel,
          icon: "clock",
          className: "dashboard-task-list__chip",
        }),
    ];
  }

  return createElement("button", {
    className: `dashboard-task-list__item dashboard-task-list__item--${variant}`,
    attributes: { type: "button" },
    events: {
      click: () => onItemClick?.(item),
    },
    children: [
      createElement("div", {
        className: "dashboard-task-list__item-content",
        children: [
          createElement("h3", {
            className: "dashboard-task-list__item-title",
            textContent: item.titleLabel || item.title || "Untitled Task",
          }),
          item.descriptionLabel &&
            createElement("p", {
              className: "dashboard-task-list__item-description",
              textContent: item.descriptionLabel,
            }),
        ].filter(Boolean),
      }),
      metaChips.filter(Boolean).length
        ? createElement("div", {
            className: "dashboard-task-list__item-meta",
            children: metaChips.filter(Boolean),
          })
        : null,
    ].filter(Boolean),
  });
};
