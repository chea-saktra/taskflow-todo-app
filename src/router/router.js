import { routerState } from "../state/router";
import { DashboardView } from "../views/dashboard/Dashboard";
import { SearchView } from "../views/search/search";
import { TasksView } from "../views/tasks/Tasks";

const routes = {
  dashboard: DashboardView,
  tasks: TasksView,
};

export const Router = () => {
  const currentRoute = routerState.getRoute();
  switch (currentRoute) {
    case "tasks":
      return TasksView();

    case "search":
      return SearchView();

    case "dashboard":
    default:
      return DashboardView();
  }
};
