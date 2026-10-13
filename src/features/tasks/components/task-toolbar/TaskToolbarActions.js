import { Button, Checkbox } from "../../../../components";
import { createElement } from "../../../../utils";

export const TaskToolbarActions = ({
  selectedCount = 0,
  isSelectionMode = false,
  allSelected = false,
  onToggleSelectMode,
  onSelectAll,
  onCompleteSelected,
  onArchiveSelected,
  onDeleteSelected,
  onAdd,
} = {}) => {
  const hasSelection = selectedCount > 0;

  return createElement("div", {
    className: "task-toolbar__actions",
    children: [
      isSelectionMode &&
        Checkbox({
          label: "Select all",
          checked: allSelected,
          className: "task-toolbar__select-all",
          attributes: {
            "aria-label": "Select all tasks",
          },
          onChange: () => onSelectAll?.(),
        }),

      Button({
        variant: isSelectionMode ? "secondary" : "ghost",
        text: isSelectionMode ? "Cancel" : "Select",
        icon: isSelectionMode ? "x" : "check-square",
        className: "task-toolbar__action",
        events: { click: () => onToggleSelectMode?.() },
      }),
      
      hasSelection &&
        createElement("span", {
          className: "task-toolbar__selected-count",
          textContent: `${selectedCount} selected`,
        }),
      hasSelection &&
        Button({
          variant: "ghost",
          text: "Complete",
          icon: "check",
          className: "task-toolbar__action",
          attributes: { "aria-label": "Complete selected tasks" },
          events: { click: () => onCompleteSelected?.() },
        }),

      hasSelection &&
        Button({
          variant: "ghost",
          text: "Archived",
          icon: "archive",
          className: "task-toolbar__action",
          attributes: { "aria-label": "Archived selected tasks" },
          events: { click: () => onArchiveSelected?.() },
        }),

      hasSelection &&
        Button({
          variant: "ghost",
          text: "Delete",
          icon: "trash-2",
          className: "task-toolbar__action task-toolbar__action--danger",
          attributes: { "aria-label": "Delete selected tasks" },
          events: { click: () => onDeleteSelected?.() },
        }),

      Button({
        variant: "primary",
        text: "Add Task",
        icon: "plus",
        className: "task-toolbar__add",
        events: { click: () => onAdd?.() },
      }),
    ].filter(Boolean),
  });
};
