import { routerState } from "../state/router";
import { ArchiveView } from "../views/archive/Archive";
import { CompletedView } from "../views/completed/Completed";
import { DashboardView } from "../views/dashboard/Dashboard";
import { FavoritesView } from "../views/favorites/Favorites";
import { SearchView } from "../views/search/search";
import { TasksView } from "../views/tasks/Tasks";
import { TodayView } from "../views/today/Today";
import { UpcomingView } from "../views/upcoming/UpcomingView";

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

    case "completed":
      return CompletedView();

    case "today":
      return TodayView();

    case "upcoming":
      return UpcomingView();

    case "archive":
      return ArchiveView();

    case "search":
      return SearchView();

    case "dashboard":
    default:
      return DashboardView();
  }
};
