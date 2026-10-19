import { archivePageController } from "../features/archive/controller/ArchivePageController";
import { dashboardPageController } from "../features/dashboard/controller/DashboardPageController";
import { searchPageController } from "../features/search/controller/SearchPageController";
import { settingsPageController } from "../features/settings/controller/SettingsPageController";
import { taskPageController } from "../features/tasks/controller/TaskPageController";

export const routes = {
  dashboard: (container) => dashboardPageController.mount(container),
  tasks: (container) => taskPageController.mount(container),
  settings: (container) => settingsPageController.mount(container),
  archive: (container) => archivePageController.mount(container),
  search: (container) => searchPageController.mount(container),
};
