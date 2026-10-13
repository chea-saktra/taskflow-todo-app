import "./task-list.css";
import { Checkbox } from "../../../../components";
import { createElement } from "../../../../utils";
import { TaskCard } from "../task-card/TaskCard";

export const TaskList = ({
  tasks = [],
  selectedIds = [],
  isSelectionMode = false,

  onSelect,
  onDetail,
  onEdit,
  onArchive,
  onDelete,
  onToggle,
  onFavorite,
} = {}) => {
  const cards = tasks.map((task) =>
    TaskCard({
      onToggle: () => onToggle?.(task.id),
      isSelectionMode,
      isSelected: selectedIds.includes(task.id),
      onSelect: () => onSelect?.(task.id),
      task,

      onDetail: () => onDetail?.(task),
      onFavorite: () => onFavorite?.(task.id),
      onEdit: () => onEdit?.(task),
      onArchive: () => onArchive?.(task.id),
      onDelete: () => onDelete?.(task.id),
    }),
  );

  return createElement("div", {
    className: "tasks-list",
    children: cards,
  });
};
