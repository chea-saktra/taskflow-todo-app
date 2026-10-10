export const DEFAULT_SETTINGS = {
  appearance: {
    theme: "system",
    accentColor: "blue",
  },

  taskPreferences: {
    defaultPriority: "medium",
    defaultStatus: "todo",
    defaultView: "all",
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    showCompleted: true,
    confirmDelete: true,
  },
};

export const DEFAULT_TASK_SETTINGS = {
  defaultPriority: "medium",
  defaultStatus: "todo",
  defaultView: "all",
  defaultSortBy: "createdAt",
  defaultSortOrder: "desc",
  showCompleted: true,
  confirmDelete: true,
};

export const DATA_MANAGEMENT_ACTIONS = [
  {
    id: "export",
    icon: "download",
    title: "Export Tasks",
    description:
      "Download all your tasks as a JSON file for backup or transfer.",
    label: "Export",
    variant: "secondary",
  },
  {
    id: "import",
    icon: "upload",
    title: "Import Tasks",
    description: "Import tasks from a previously exported JSON file.",
    label: "Import",
    variant: "secondary",
  },
  {
    id: "clear-completed",
    icon: "check-check",
    title: "Clear Completed Tasks",
    description: "Permanently remove all tasks that have been completed.",
    label: "Clear Completed",
    variant: "secondary",
  },
  {
    id: "clear-archived",
    icon: "archive",
    title: "Clear Archived Tasks",
    description: "Permanently remove all tasks that have been archived.",
    label: "Clear Archived",
    variant: "secondary",
  },
  {
    id: "delete-all",
    icon: "trash-2",
    title: "Delete All Tasks",
    description: "Permanently delete every task from your task list.",
    label: "Delete All",
    variant: "danger",
  },
  {
    id: "reset",
    icon: "rotate-ccw",
    title: "Reset Settings",
    description: "Restore all application settings to their default values.",
    label: "Reset",
    variant: "danger",
  },
];
