import { capitalize } from "../utils";

export const getOverviewCards = (data = {}) => [
  {
    key: "total",
    label: "Total Tasks",
    value: data.total ?? 0,
    icon: "list-checks",
    color: "total",
  },
  {
    key: "todo",
    label: "To Do",
    value: data.todo ?? 0,
    icon: "circle",
    color: "todo",
  },
  {
    key: "in-progress",
    label: "In Progress",
    value: data.inProgress ?? 0,
    icon: "clock",
    color: "in-progress",
  },
  {
    key: "completed",
    label: "Completed",
    value: data.completed ?? 0,
    icon: "circle-check",
    color: "completed",
  },
  {
    key: "overdue",
    label: "Overdue",
    value: data.overdue ?? 0,
    icon: "triangle-alert",
    color: "overdue",
  },
  {
    key: "archived",
    label: "Archived",
    value: data.archived ?? 0,
    icon: "archive",
    color: "muted",
  },
];

export const getProgressStats = ({
  total = 0,
  todo = 0,
  inProgress = 0,
  completed = 0,
  archived = 0,
} = {}) => [
  { label: "Total", value: total, type: "total" },
  { label: "To Do", value: todo, type: "todo" },
  { label: "In Progress", value: inProgress, type: "in-progress" },
  { label: "Completed", value: completed, type: "completed" },
  {label:"Archived",value:archived,type:"archived"}
];

export const getStatisticsSections = ({
  status = {},
  priority = {},
  category = {},
} = {}) => [
  {
    title: "Task Status",
    items: [
      { label: "To Do", value: status.todo ?? 0, type: "todo" },
      {
        label: "In Progress",
        value: status.inProgress ?? 0,
        type: "in-progress",
      },
      { label: "Completed", value: status.completed ?? 0, type: "completed" },
    ],
  },
  {
    title: "Priority",
    items: [
      { label: "High", value: priority.high ?? 0, type: "high" },
      { label: "Medium", value: priority.medium ?? 0, type: "medium" },
      { label: "Low", value: priority.low ?? 0, type: "low" },
    ],
  },
  {
    title: "Category",
    items: Object.entries(category).map(([key, value]) => ({
      label: capitalize(key.replace(/[-_]/g, " ")),
      value: value ?? 0,
      type: key,
    })),
  },
];
