import { DEFAULT_SETTINGS } from "../constants";
import { BaseState } from "./BaseState";

class SettingsState extends BaseState {
  constructor() {
    super();

    this.settings = structuredClone(DEFAULT_SETTINGS);
  }

  getSettings() {
    return this.settings;
  }

  getAppearance() {
    return this.settings.appearance;
  }

  getTaskPreferences() {
    return this.settings.taskPreferences;
  }

  setAppearance(changes = {}) {
    this.settings.appearance = {
      ...this.settings.appearance,
      ...changes,
    };

    this.notify(this.settings);
  }

  setTaskPreferences(changes = {}) {
    this.settings.taskPreferences = {
      ...this.settings.taskPreferences,
      ...changes,
    };

    this.notify(this.settings);
  }

  update(changes = {}) {
    this.settings = {
      ...this.settings,
      ...changes,
    };

    this.notify(this.settings);
  }

  reset() {
    this.settings = structuredClone(DEFAULT_SETTINGS);

    this.notify(this.settings);
  }
}

export const settingsState = new SettingsState();
