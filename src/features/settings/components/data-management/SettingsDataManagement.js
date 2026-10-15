import "./settings-data-management.css";
import { Button, Card } from "../../../../components";
import { DATA_MANAGEMENT_ACTIONS } from "../../../../constants";
import { createElement } from "../../../../utils";

export const SettingsDataManagement = ({
  onExport,
  onImport,
  onClearCompleted,
  onClearArchived,
  onDeleteAll,
  onReset,
} = {}) => {
  const fileInput = createElement("input", {
    className: "settings-data-management__file-input",
    attributes: {
      type: "file",
      accept: ".json,application/json",
      hidden: "true",
    },
    events: {
      change: (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        onImport?.(false);
        event.target.value = "";
      },
    },
  });

  const actionHeadlers = {
    export: onExport,
    import: () => fileInput.click(),
    "clear-completed": onClearCompleted,
    "clear-archived": onClearArchived,
    "delete-all": onDeleteAll,
    reset: onReset,
  };

  const actionElements = DATA_MANAGEMENT_ACTIONS.map((action) => {
    return createElement("div", {
      className: "settings-data-management__action",
      children: [
        createElement("div", {
          className: "settings-data-management__action-info",
          children: [
            createElement("h3", {
              className: "settings-data-management__action-title",
              textContent: action.title,
            }),
            createElement("p", {
              className: "settings-data-management__action-description",
              textContent: action.description,
            }),
          ],
        }),
        Button({
          text: action.label,
          icon: action.icon,
          variant: action.variant,
          events: {
            click: actionHeadlers[action.id],
          },
        }),
      ],
    });
  });

  const headerContent = createElement("div", {
    className: "settings-data-management__heading",
    children: [
      createElement("h2", {
        className: "settings-data-management__title",
        textContent: "Data Management",
      }),
      createElement("p", {
        className: "settings-data-management__subtitle",
        textContent:
          "Manage your task data, backups, and application settings.",
      }),
    ],
  });

  return Card({
    className: "settings-data-management",
    header: headerContent,
    children: [
      createElement("div", {
        className: "settings-data-management__body",
        children: [...actionElements, fileInput],
      }),
    ],
  });
};
