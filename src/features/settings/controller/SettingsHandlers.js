import { taskService } from "../../tasks/services/TaskService";
import { settingsService } from "../service/SettingsService";

export class SettingsHandlers {
  constructor(stateStore, renderFn) {
    this.store = stateStore;
    this.render = renderFn;
  }

  handleUpdateAppearance = (change = {}) => {
    settingsService.updateAppearance(change);
    this.store.setDirty(true);
    this.render();
  };

  handleUpdateTaskPreferences = (change = {}) => {
    settingsService.updateTaskPreferences(change);
    this.store.setDirty(true);
    this.render();
  };

  handleReset = () => {
    settingsService.reset();
    this.store.resetState();
    this.render();
  };

  handleDataManagementAction = (actionId) => {
    switch (actionId) {
      case "clear-completed":
        taskService.clearCompleted();
        break;
      case "clear-archived":
        taskService.clearArchived();
        break;
      case "delete-all":
        if (confirm("Are you sure you want to delete ALL tasks permanently")) {
          taskService.deleteAll();
        }
        break;
      case "reset":
        this.handleReset();
        break;

      default:
        console.warn(`Unhandled action: ${actionId}`);
    }

    this.render();
  };
}
