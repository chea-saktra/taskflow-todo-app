import { routerState } from "../state/router";
import { taskState } from "../state/task";
import { DashboardView } from "../views/dashboard/Dashboard";
import { TasksView } from "../views/tasks/Tasks";

const routes = {
  dashboard: DashboardView,
  tasks: TasksView,
};

export const Router = () => {
  const currentRoute = routerState.getRoute();

  if (currentRoute === "tasks") {
    return TasksView({
      tasks: taskState.getTasks(),
      categories: taskState.getCategories(),
      activeCategory: taskState.getActiveCategory(),
      onCategoryChange: (cat) => taskState.setCategory(cat),
      onToggleTask: (id, completed) => taskState.toggleTask(id, completed),
      onTaskAction: (task) => console.log("Action on task:", task),
      onNewTask: () => alert("Open Add Task Modal"),
    });
  }

  return DashboardView();
};
