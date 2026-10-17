import { DashboardPage } from "../../../page/dashboard/Dashboard";
import { routerService } from "../../../services";
import { taskState } from "../../../state";
import { taskPageController } from "../../tasks/controller/TaskPageController";
import { DashboardActions } from "./DashboardActions";
import { DashboardHandlers } from "./DashboardHandlers";
import { DashboardStateStore } from "./DashboardStateStore";

class DashboardPageController {
  constructor() {
    this.container = null;
    this.unsubscribe = null;
    this.store = new DashboardStateStore();
    this.actions = new DashboardActions(this.store);
    this.handlers = new DashboardHandlers(this.actions, () => this.render(), {
      onTaskClick: (item) => {
        if (typeof this.onTaskClick === "function") {
          this.onTaskClick(item);
          return;
        }
        routerService.navigate("tasks");
        setTimeout(() => {
          taskPageController.handlers?.handleOpenDetailModal(item);
        }, 100);
      },
      onCreateTask: () => {
        if (typeof this.onCreateTask === "function") {
          this.onCreateTask();
          return;
        }
        routerService.navigate("tasks");
        setTimeout(() => {
          taskPageController.handlers?.handleOpenCreateModal();
        }, 100);
      },
    });
  }

  mount = (container, navigationCallbacks = {}) => {
    this.unmount();
    this.container = container;

    this.onTaskClick = navigationCallbacks.onTaskClick;
    this.onCreateTask = navigationCallbacks.onCreateTask;

    this.subscribe();
    this.load();
    return this;
  };

  unmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.container = null;
  };

  subscribe = () => {
    if (typeof taskState.subscribe !== "function") return;

    this.unsubscribe = taskState.subscribe(() => {
      this.load();
    });
  };

  load = () => {
    this.actions.load();
    this.render();
  };

  render = () => {
    if (!this.container) return;

    const data = this.store.getData();

    const page = DashboardPage({
      ...data,
      loading: this.store.isLoading(),
      error: this.store.getError(),

      onRefresh: this.handlers.handleRefresh,
      onTaskClick: this.handlers.handleTaskClick,
      onCreateTask: this.handlers.handleCreateTask,
    });

    this.container.replaceChildren(page);
    window.lucide?.createIcons();
  };
}
export const dashboardPageController = new DashboardPageController();
