import { routerState } from "../state/router";
import { DashboardView } from "../views/dashboard/Dashboard";
import { TasksView } from "../views/tasks/Tasks";

const routes = {
  dashboard: DashboardView,
  tasks: TasksView,
};

export const Router = () => {
  const currentRoute = routerState.getRoute();

  const ViewComponent = routes[currentRoute] || routes.dashboard;

  return ViewComponent();
};
