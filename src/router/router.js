import { routerState } from "../state/router";
import { DashboardView } from "../views/dashboard/Dashboard";
import { FavoritesView } from "../views/favorites/Favorites";
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

    case "favorites":
      return FavoritesView();

    case "search":
      return SearchView();

    case "dashboard":
    default:
      return DashboardView();
  }
};
