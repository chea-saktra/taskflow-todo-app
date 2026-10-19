import { SettingsPage } from "../../../page/Settings/settings";
import { routerService } from "../../../services";
import { settingsState } from "../../../state";
import { settingsService } from "../service/SettingsService";
import { SettingsHandlers } from "./SettingsHandlers";
import { SettingsStateStore } from "./SettingsStateStore";

class SettingsPageController {
  constructor() {
    this.container = null;
    this.unsubscribe = null;
    this.store = new SettingsStateStore();
    this.handlers = new SettingsHandlers(this.store, () => this.render());
  }

  mount = (container) => {
    this.container = container;
    settingsService.initialize();
    if (typeof settingsState.subscribe === "function") {
      this.unsubscribe = settingsState.subscribe(() => {
        if (routerService.getCurrentRoute() === "settings") {
          this.render();
        }
      });
    }
    this.render();
    return this;
  };

  unmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    if (this.container) {
      this.container.innerHTML = "";
    }
    this.container = null;
  };

  getSettings = () => {
    return settingsService.getAll();
  };

  render = () => {
    if (!this.container) return;

    const settings = this.getSettings();

    const page = SettingsPage({
      settings,
      activeTab: this.store.activeTab,
      errors: this.store.errors,

      onUpdateAppearance: this.handlers.handleUpdateAppearance,
      onUpdateTaskPreferences: this.handlers.handleUpdateTaskPreferences,
      onReset: this.handlers.handleReset,
      onAction: this.handlers.handleDataManagementAction,
    });

    this.container.replaceChildren(page);
    window.lucide?.createIcons();
  };
}

export const settingsPageController = new SettingsPageController();
