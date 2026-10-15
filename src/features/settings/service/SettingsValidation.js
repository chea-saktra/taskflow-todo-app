import {
  ACCENT_COLOR_OPTIONS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  STATUS_OPTIONS,
  THEME_OPTIONS,
  VIEW_OPTIONS,
} from "../../../constants";

class SettingsValidation {
  validateAppearance(appearance = {}) {
    const errors = {};

    if (
      appearance.theme &&
      !THEME_OPTIONS.some((opt) => opt.value === appearance.theme)
    ) {
      errors.theme = "Invalid theme option selected.";
    }

    if (
      appearance.accentColor &&
      !ACCENT_COLOR_OPTIONS.some((opt) => opt.value === appearance.accentColor)
    ) {
      errors.accentColor = "Invalid accent color selected.";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  validateTaskPreferences(preferences = {}) {
    const errors = {};

    if (
      preferences.defaultPriority &&
      !PRIORITY_OPTIONS.some((opt) => opt.value === preferences.defaultPriority)
    ) {
      errors.defaultPriority = "Invalid priority selected.";
    }

    if (
      preferences.defaultStatus &&
      !STATUS_OPTIONS.some((opt) => opt.value === preferences.defaultStatus)
    ) {
      errors.defaultStatus = "Invalid status selected";
    }

    if (
      preferences.defaultView &&
      !VIEW_OPTIONS.some((opt) => opt.value === preferences.defaultView)
    ) {
      errors.defaultView = "Invalid view option selected";
    }

    if (
      preferences.defaultSortBy &&
      !SORT_OPTIONS.some((opt) => opt.value === preferences.defaultSortBy)
    ) {
      errors.defaultSortBy = "Invalid sort option selected";
    }

    if (
      preferences.defaultSortOrder &&
      !SORT_ORDER_OPTIONS.some(
        (opt) => opt.value === preferences.defaultSortOrder,
      )
    ) {
      errors.defaultSortOrder = "Invalid sort order selected";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

export const settingsValidation = new SettingsValidation();
