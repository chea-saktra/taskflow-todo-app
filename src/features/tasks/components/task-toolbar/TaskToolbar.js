import "./task-toolbar.css";
import { createElement } from "../../../../utils";
import { TaskToolbarActions } from "./TaskToolbarActions";
import { TaskToolbarSort } from "./TaskToolbarSort";
import { TaskToolbarView } from "./TaskToolbarView";

export const TaskToolbar = ({
  view = "all",
  sortBy = "createdAt",
  sortOrder = "desc",
  selectedCount = 0,
  isSelectionMode = false,
  allSelected = false,
  onViewChange,
  onSortChange,

  onToggleSelectMode,
  onSelectAll,
  onCompleteSelected,
  onArchiveSelected,
  onDeleteSelected,
  onAdd,
} = {}) => {
  return createElement("div", {
    className: "task-toolbar",
    children: [
      createElement("div", {
        className: "task-toolbar__left",
        children: [
          TaskToolbarView({
            value: view,
            onChange: onViewChange,
          }),
          TaskToolbarSort({
            sortBy,
            sortOrder,
            onChange: onSortChange,
          }),
        ],
      }),
      TaskToolbarActions({
        selectedCount,
        isSelectionMode,
        allSelected,
        onToggleSelectMode,
        onSelectAll,
        onCompleteSelected,
        onArchiveSelected,
        onDeleteSelected,

        onAdd,
      }),
    ],
  });
};
