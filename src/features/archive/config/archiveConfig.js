
export const getArchiveCardAction = ({ id, onRestore, onDelete }) => [
  {
    icon: "archive-restore",
    label: "Restore task",
    onClick: () => onRestore?.(id),
  },
  {
    icon: "trash-2",
    label: "Delete task",
    danger: true,
    onClick: () => onDelete?.(id),
  },
];

export const getArchiveTaskInfo = (task = {}) => [
  {
    key: "subtasks",
    show: (task.subtaskCount ?? 0) > 0,
    icon: "list-checks",
    text: `${task.completedSubtaskCount ?? 0}/${task.subtaskCount} subtasks`,
  },
  {
    key: "dueDate",
    show: Boolean(task.dueDate),
    icon: "calendar",
    text: task.dueDate,
  },
  {
    key: "archivedAt",
    show: Boolean(task.archivedAt),
    icon: "archive",
    text: task.archivedAt,
  },
];

export const getArchiveListState = (tasks = [], selectedIds = []) => {
  const totalTasks = tasks.length;
  const isAllSelected =
    totalTasks > 0 && tasks.every((task) => selectedIds.includes(task.id));
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  return {
    isAllSelected,
    isSomeSelected,
    countLabel: `${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`,
    selectAllLabel: isAllSelected ? "Deselect all" : "Select all",
  };
};



export const parseSortValue = (value = "") => {
  const [sortBy, sortOrder] = value.split("-");
  return { sortBy, sortOrder };
};

export const getBulkActionsState = (selectedCount = 0) => {
  const itemLabel = selectedCount === 1 ? "task" : "tasks";

  return {
    countLabel: `${selectedCount} ${itemLabel} selected`,
    restoreAriaLabel: `Restore ${selectedCount} ${itemLabel}`,
    deleteAriaLabel: `Delete ${selectedCount} ${itemLabel}`,
  };
};
