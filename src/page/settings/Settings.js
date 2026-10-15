import "./settings.css";
import { SettingsAppearance } from "../../features/settings/components/appearance/SettingsAppearance";
import { SettingsDataManagement } from "../../features/settings/components/data-management/SettingsDataManagement";
import { SettingsTaskPreferences } from "../../features/settings/components/task-preferences/SettingsTaskPreferences";
import { Page, PageContent, PageHeader } from "../../layouts";

export const SettingsPage = ({
  settings = {},
  onUpdateAppearance,
  onUpdateTaskPreferences,
  onReset,
  onAction,
} = {}) => {
  const pageHeader = PageHeader({
    title: "Settings",
    subtitle: "Manage your application preferences",
  });

  const pageContent = PageContent({
    className: "settings-page__content",
    children: [
      SettingsAppearance({
        settings: settings.appearance,
        onUpdate: onUpdateAppearance,
      }),

      SettingsTaskPreferences({
        settings: settings.taskPreferences,
        onUpdate: onUpdateTaskPreferences,
      }),

      SettingsDataManagement({
        onReset: () => onAction?.("reset") || onReset?.(),
        onClearCompleted: () => onAction?.("clear-completed"),
        onClearArchived: () => onAction?.("clear-archived"),
        onDeleteAll: () => onAction?.("delete-all"),
      }),
    ],
    fluid: true,
  });

  return Page({
    header: pageHeader,
    content: pageContent,
  });
};
