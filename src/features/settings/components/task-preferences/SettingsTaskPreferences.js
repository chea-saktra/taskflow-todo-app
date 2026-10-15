import "./settings-task-preferences.css";
import { Card, Select, Switch } from "../../../../components";
import {
  DEFAULT_TASK_SETTINGS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  STATUS_OPTIONS,
  VIEW_OPTIONS,
} from "../../../../constants";
import { createElement } from "../../../../utils";

export const SettingsTaskPreferences = ({ settings = {}, onUpdate } = {}) => {
  const currentSettings = {
    ...DEFAULT_TASK_SETTINGS,
    ...settings,
  };

  const headerContent = createElement("div", {
    className: "settings-task-preferences__heading",
    children: [
      createElement("h2", {
        className: "settings-task-preferences__title",
        textContent: "Task Preferences",
      }),
      createElement("p", {
        className: "settings-task-preferences__subtitle",
        textContent: "Configure how tasks behave and are displayed.",
      }),
    ],
  });

  const fields = [
    Select({
      id: "settings-default-priority",
      label: "Default Priority",
      hint: "Priority automatically assigned to new tasks.",
      value: currentSettings.defaultPriority,
      options: PRIORITY_OPTIONS,
      onChange: (val) => onUpdate?.({ defaultPriority: val }),
    }),
    Select({
      id: "settings-default-status",
      label: "Default Status",
      hint: "Status automatically assigned to new tasks.",
      value: currentSettings.defaultStatus,
      options: STATUS_OPTIONS,
      onChange: (val) => onUpdate?.({ defaultStatus: val }),
    }),
    Select({
      id: "settings-default-view",
      label: "Default Task View",
      hint: "Choose the task view shown when opening the Tasks page.",
      value: currentSettings.defaultView,
      options: VIEW_OPTIONS,
      onChange: (val) => onUpdate?.({ defaultView: val }),
    }),
    Select({
      id: "settings-default-sort",
      label: "Default Sort",
      hint: "Choose the tasks are sorted by default.",
      value: currentSettings.defaultSortBy,
      options: SORT_OPTIONS,
      onChange: (val) => onUpdate?.({ defaultSortBy: val }),
    }),
    Select({
      id: "settings-default-sort-order",
      label: "Default Order",
      hint: "Choose ascending or descending order.",
      value: currentSettings.defaultSortOrder,
      options: SORT_ORDER_OPTIONS,
      onChange: (val) => onUpdate?.({ defaultSortOrder: val }),
    }),

    Switch({
      id: "settings-show-completed",
      label: "Show Completed Tasks",
      description: "Keep completed tasks visible in task lists.",
      checked: currentSettings.showCompleted,
      onChange: (val) => onUpdate?.({ showCompleted: val }),
    }),

    Switch({
      id: "settings-confirm-delete",
      label: "Confirm Before Delete",
      description: "Ask for confirmation before permanently deleting a task.",
      checked: currentSettings.confirmDelete,
      onChange: (val) => onUpdate?.({ confirmDelete: val }),
    }),
  ];

  return Card({
    className: "settings-task-preferences",
    header: headerContent,
    children: [
      createElement("div", {
        className: "settings-task-preferences__body",
        children: fields,
      }),
    ],
  });
};
