import { dateService } from "../../../services";
import { capitalize } from "../../../utils";

export const getTaskMenuItems = ({ task, onEdit, onArchive, onDelete }) => [
  {
    label: "Edit",
    icon: "pencil",
    onClick: () => onEdit?.(task),
  },
  {
    label: task.archived ? "Unarchive" : "Archive",
    icon: "archive",
    onClick: () => onArchive?.(task.id),
  },
  {
    label: "Delete",
    icon: "trash-2",
    isDanger: true,
    onClick: () => onDelete?.(task.id),
  },
];

export const FILTER_OPTIONS = {
  categories: [
    { label: "All Categories", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Work", value: "work" },
    { label: "Shopping", value: "shopping" },
  ],
  priorities: [
    { label: "All Priorities", value: "all" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ],
  statuses: [
    { label: "All Statuses", value: "all" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ],
};

export const getTaskMeta = (task = {}) => {
  const meta = [];

  if (task.category) {
    meta.push({
      key: "category",
      type: task.category,
      text: capitalize(task.category),
    });
  }

  if (task.priority) {
    meta.push({
      key: "priority",
      type: task.priority,
      text: capitalize(task.priority),
    });
  }

  if (task.status) {
    meta.push({
      key: "status",
      type: task.status,
      text: capitalize(task.status),
    });
  }

  return meta;
};

export const enhanceTaskForUI = (task) => {
  if (!task) return null;
  const subtasks = task.subtasks || [];
  const completed = subtasks.filter((st) => st.completed).length;
  const total = subtasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    ...task,
    subtasks,
    completed,
    total,
    progress,
    dueDateLabel: task.dueDate ? dateService.formatRelative(task.dueDate) : "",
    overdue: task.dueDate ? dateService.isOverdue(task.dueDate) : false,
  };
};
