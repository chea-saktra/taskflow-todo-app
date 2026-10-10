import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "./task";

export const ARCHIVE_SORT_OPTIONS = [
  { value: "updatedAt-desc", label: "Recently updated" },
  { value: "updatedAt-asc", label: "Oldest updated" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "dueDate-asc", label: "Due date: earliest" },
  { value: "dueDate-desc", label: "Due date: latest" },
  { value: "priority-desc", label: "Priority: high to low" },
  { value: "priority-asc", label: "Priority: low to high" },
];

export const PRIORITY_OPTIONS = [
  { value: TASK_PRIORITY.LOW, label: "Low" },
  { value: TASK_PRIORITY.MEDIUM, label: "Medium" },
  { value: TASK_PRIORITY.HIGH, label: "High" },
];

export const STATUS_OPTIONS = [
  { value: TASK_STATUS.TODO, label: "To Do" },
  { value: TASK_STATUS.IN_PROGRESS, label: "In Progress" },
  { value: TASK_STATUS.COMPLETED, label: "Completed" },
];

export const VIEW_OPTIONS = [
  { value: "all", label: "All Tasks" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "favorites", label: "Favorites" },
  { value: "archived", label: "Archived" },
];

export const SORT_OPTIONS = [
  { value: "createdAt", label: "Created Date" },
  { value: "updatedAt", label: "Updated Date" },
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];

export const SORT_ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export const TASK_FILTER_OPTIONS = {
  categories: Object.values(TASK_CATEGORY).map((value) => ({
    value,
    label: value,
  })),

  priorities: Object.values(TASK_PRIORITY).map((value) => ({
    value,
    label: value,
  })),

  statuses: Object.values(TASK_STATUS).map((value) => ({
    value,
    label: value,
  })),
};

export const THEME_OPTIONS = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export const ACCENT_COLOR_OPTIONS = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
];
