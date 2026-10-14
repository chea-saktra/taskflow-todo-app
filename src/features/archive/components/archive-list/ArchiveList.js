import "./archive-list.css";
import { Button, EmptyState } from "../../../../components";
import { createElement } from "../../../../utils";
import {
  getArchiveListState,
  getBulkActionsState,
} from "../../config/archiveConfig";
import { ArchiveCard } from "../archive-card/ArchiveCard";

export const ArchiveList = ({
  tasks = [],
  selectedIds = [],
  onSelect,
  onDeselectAll,
  onRestore,
  onRestoreSelected,
  onDelete,
  onDeleteSelected,
} = {}) => {
  if (!tasks.length) {
    return EmptyState({
      icon: "archive",
      title: "No archived tasks",
      description: "Tasks that you archive will appear here.",
    });
  }

  const hasSelection = selectedIds.length > 0;
  let listHeader = null;

  if (hasSelection) {
    const {
      countLabel: selectedCountLabel,
      restoreAriaLabel,
      deleteAriaLabel,
    } = getBulkActionsState(selectedIds.length);

    const countElement = createElement("span", {
      className: "archive-list__selected-count",
      textContent: selectedCountLabel,
    });

    const actionsGroup = createElement("div", {
      className: "archive-list__bulk-actions",
      children: [
        Button({
          text: "Deselect All",
          icon: "x",
          variant: "ghost",
          size: "sm",
          className: "archive-list__action-btn",
          attributes: { "aria-label": "Deselect all selected tasks" },
          events: { click: () => onDeselectAll?.() },
        }),

        Button({
          text: "Restore",
          icon: "archive-restore",
          variant: "secondary",
          size: "sm",
          className: "archive-list__action-btn",
          attributes: {
            "aria-label": restoreAriaLabel,
          },
          events: {
            click: () => onRestoreSelected?.(),
          },
        }),

        Button({
          text: "Delete",
          icon: "trash-2",
          variant: "danger",
          size: "sm",
          className: "archive-list__action-btn",
          attributes: {
            "aria-label": deleteAriaLabel,
          },
          events: {
            click: () => onDeleteSelected?.(),
          },
        }),
      ],
    });
    listHeader = createElement("div", {
      className: "archive-list__header",
      children: [countElement, actionsGroup],
    });
  }

  const listItems = createElement("div", {
    className: "archive-list__items",
    attributes: {
      role: "list",
      "aria-label": "Archived tasks",
    },
    children: tasks.map((task) =>
      createElement("div", {
        className: "archive-list__item",
        attributes: { role: "listitem" },
        children: [
          ArchiveCard({
            task,
            isSelected: selectedIds.includes(task.id),
            onSelect,
            onRestore,
            onDelete,
          }),
        ],
      }),
    ),
  });

  return createElement("section", {
    className: "archive-list",
    children: [listHeader, listItems].filter(Boolean),
  });
};
