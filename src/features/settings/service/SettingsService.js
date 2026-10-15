import { DEFAULT_SETTINGS, STORAGE_KEY } from "../../../constants";
import {
  notificationService,
  StorageService,
  themeService,
} from "../../../services";
import { settingsState, themeState } from "../../../state";
import { settingsValidation } from "./SettingsValidation";

class SettingsService {
  getAll = () => settingsState.getSettings();
  getAppearance = () => settingsState.getAppearance();
  getTaskPreferences = () => settingsState.getTaskPreferences();

  notifyError = (msg) => (notificationService.error(msg), null);
  notifySuccess = (msg, value = true) => (
    notificationService.success(msg),
    value
  );

  initialize = () => {
    const storedSettings = StorageService.get(STORAGE_KEY.SETTINGS, null);

    if (storedSettings) {
      const mergedSettings = {
        ...DEFAULT_SETTINGS,
        ...storedSettings,

        appearance: {
          ...DEFAULT_SETTINGS.appearance,
          ...(storedSettings.appearance || {}),
        },

        taskPreferences: {
          ...DEFAULT_SETTINGS.taskPreferences,
          ...(storedSettings.taskPreferences || {}),
        },
      };

      settingsState.update(mergedSettings);
      if (mergedSettings.appearance?.theme) {
        this.applyTheme(mergedSettings.appearance.theme);
      }
      if (mergedSettings.appearance?.accentColor) {
        this.applyAccentColor(mergedSettings.appearance.accentColor);
      }

      return;
    }
    this.save(DEFAULT_SETTINGS);
  };

  applyTheme = (theme) => {
    if (!theme) return;
    if (theme === "system") {
      themeService.resetToSystem();
    } else {
      themeState.setTheme(theme);
    }
  };

  applyAccentColor = (accentColor) => {
    if (!accentColor) return;
    document.documentElement.setAttribute("data-accent", accentColor);
  };

  update = (changes = {}) => {
    const current = this.getAll();
    const updated = {
      ...current,
      ...changes,

      appearance: {
        ...current.appearance,
        ...(changes.appearance || {}),
      },

      taskPreferences: {
        ...(current.taskPreferences || {}),
        ...(changes.taskPreferences || {}),
      },
    };

    settingsState.update(updated);
    this.persist();

    return this.notifySuccess("Settings updated.", settingsState.getSettings());
  };

  updateAppearance = (changes = {}) => {
    const currentAppearance = this.getAppearance();
    const updated = { ...currentAppearance, ...changes };

    const validation = settingsValidation.validateAppearance(updated);
    if (!validation.valid) {
      return this.notifyError(Object.values(validation.errors)[0]);
    }

    settingsState.setAppearance(updated);
    this.persist();

    if (changes.theme) {
      this.applyTheme(changes.theme);
    }

    if (changes.accentColor) {
      this.applyAccentColor(changes.accentColor);
    }

    return this.notifySuccess(
      "Appearance Updated.",
      settingsState.getAppearance(),
    );
  };

  updateTaskPreferences = (changes = {}) => {
    console.log("Dfa");
    const currentPrefs = this.getTaskPreferences();
    const updated = { ...currentPrefs, ...changes };

    const validation = settingsValidation.validateTaskPreferences(updated);
    if (!validation.valid) {
      return this.notifyError(Object.values(validation.errors)[0]);
    }

    settingsState.setTaskPreferences(updated);
    this.persist();
    return this.notifySuccess(
      "Task perferences updated.",
      settingsState.getTaskPreferences(),
    );
  };

  shouldShowCompleted = () => {
    const prefs = this.getTaskPreferences();
    return prefs?.showCompleted ?? true;
  };

  shouldConfirmDelete = () => {
    const prefs = this.getTaskPreferences();
    return prefs?.confirmDelete ?? true;
  };

  reset = () => {
    settingsState.update(structuredClone(DEFAULT_SETTINGS));
    this.persist();
    return this.notifySuccess("Settings reset to defaults.");
  };

  save = (settings = DEFAULT_SETTINGS) => {
    settingsState.update(structuredClone(settings));
    this.persist();

    return settingsState.getSettings();
  };

  persist = () => {
    StorageService.set(STORAGE_KEY.SETTINGS, settingsState.getSettings());
  };
}

export const settingsService = new SettingsService();
