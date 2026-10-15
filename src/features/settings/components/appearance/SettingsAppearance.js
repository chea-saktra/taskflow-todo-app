import "./settings-appearance.css";
import { Card, Select } from "../../../../components";
import { ACCENT_COLOR_OPTIONS, THEME_OPTIONS } from "../../../../constants";
import { createElement } from "../../../../utils";

export const SettingsAppearance = ({ settings = {}, onUpdate } = {}) => {
  const currentTheme = settings?.theme || "system";
  const currentAccent = settings?.accentColor || "blue";

  const headerContent = createElement("div", {
    className: "settings-appearance__heading",
    children: [
      createElement("h2", {
        className: "settings-appearance__title",
        textContent: "Appearance",
      }),
      createElement("p", {
        className: "settings-appearance__subtitle",
        textContent: "Customize the look and feel of your workspace.",
      }),
    ],
  });

  const themeSelect = Select({
    id: "settings-theme",
    label: "Theme",
    hint: "Choose how the application looks.",
    value: currentTheme,
    options: THEME_OPTIONS,
    onChange: (themeValue) => onUpdate?.({ theme: themeValue }),
  });

  const accentSelect = Select({
    id: "settings-accent-color",
    label: "Accent Color",
    hint: "Choose the primary color used throughout the app.",
    value: currentAccent,
    options: ACCENT_COLOR_OPTIONS,
    onChange: (accentColorValue) =>
      onUpdate?.({ accentColor: accentColorValue }),
  });

  return Card({
    className: "settings-appearance",
    header: headerContent,
    children: [
      createElement("div", {
        className: "settings-appearance__body",
        children: [themeSelect, accentSelect],
      }),
    ],
  });
};
