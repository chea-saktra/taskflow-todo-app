import { TASK_STATUS } from "./task";

export const TOOLBAR_SORT = [
  {
    label: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    label: "Oldest",
    sortBy: "createdAt",
    sortOrder: "asc",
  },
  {
    label: "Title A-Z",
    sortBy: "title",
    sortOrder: "asc",
  },
  {
    label: "Priority",
    sortBy: "priority",
    sortOrder: "desc",
  },
];

export const VIEWS = [
  { value: "all", label: "All Tasks", icon: "list" },
  { value: TASK_STATUS.TODO, label: "To Do", icon: "circle" },
  { value: TASK_STATUS.IN_PROGRESS, label: "In Progress", icon: "clock" },
  { value: TASK_STATUS.COMPLETED, label: "Completed", icon: "circle-check" },
  { value: "favorites", label: "Favorites", icon: "star" },
  { value: "archived", label: "Archived", icon: "archive" },
];
