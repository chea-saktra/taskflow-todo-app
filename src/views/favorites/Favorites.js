import "./favorites.css";
import { Fab } from "../../components/fab/Fab";
import { TaskController } from "../../features/tasks/controller";
import { taskState } from "../../state/task";
import { createElement, openTaskModal } from "../../utils";
import { EmptyState } from "../../components/empty-state/EmptyState";
import { TaskCard } from "../../components/task-card/TaskCard";

export const FavoritesView = () => {
  const container = createElement("section", {
    className: "favorites-view",
  });

  const renderContent = () => {
    container.innerHTML = "";
    const allTasks = taskState.getTasks();
    const favoriteTasks = allTasks.filter(
      (task) => task.isFavorite || task.starred,
    );

    const tasksContainer = createElement("div", {
      className: "favorites-view__list",
    });
    if (favoriteTasks.length === 0) {
      const emptyState = EmptyState({
        icon: "star",
        title: "No favorite tasks yet",
        description: "Star important tasks to easily access them here anytime.",
      });
      tasksContainer.append(emptyState);
    } else {
      favoriteTasks.forEach((task) => {
        const card = TaskCard({
          task,
          isFavoritesView: true,
          onToggle: (id) => TaskController.toggleTaskStatus(id),
          onFavorite: (id) => TaskController.toggleFavoriteTask(id),
          onEdit: (taskData) => openTaskModal(taskData),
          onDelete: (id) => TaskController.removeTask(id),
        });
        tasksContainer.append(card);
      });
    }
    const btnFab = Fab({
      onClick: () => openTaskModal(),
    });

    container.append(tasksContainer, btnFab);
  };

  taskState.subscribe(() => renderContent());

  renderContent();

  return container;
};
