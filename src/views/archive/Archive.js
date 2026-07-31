import "./archive.css";
import { EmptyState } from "../../components/empty-state/EmptyState";
import { Fab } from "../../components/fab/Fab";
import { TaskCard } from "../../components/task-card/TaskCard";
import { TaskController } from "../../features/tasks/controller";
import { taskState } from "../../state/task";
import { createElement, openTaskModal } from "../../utils";
import { openDeleteModal } from "../../components/DeleteConfirmation/DeleteConfirmation";

export const ArchiveView = () => {
  const container = createElement("section", {
    className: "archive-view",
  });

  const renderContent = () => {
    container.innerHTML = "";
    const allTasks = taskState.getTasks();
    const archivedTasks = allTasks.filter((task) => task.isArchived === true);
    const tasksContainer = createElement("div", {
      className: "archive-view__list",
    });

    if (archivedTasks.length === 0) {
      const emptyState = EmptyState({
        icon: "archive",
        title: "No archived tasks",
        description: "Tasks you archive will be stored safely here.",
      });
      tasksContainer.append(emptyState);
    } else {
      archivedTasks.forEach((task) => {
        const card = TaskCard({
          task,
          onToggle: (id, isChecked) =>
            TaskController.toggleTaskStatus(id, isChecked),
          onFavorite: (id) => TaskController.toggleFavoriteTask(id),
          onArchive: (id) => TaskController.toggleArchiveTask(id),
          onEdit: (taskData) => openTaskModal(taskData),
          onDelete: (id) => openDeleteModal(id),
        });
        tasksContainer.append(card);
      });
    }
    const btnFab = Fab({ onClick: () => openTaskModal() });

    container.append(tasksContainer, btnFab);
  };

  taskState.subscribe(() => renderContent());

  renderContent();

  return container;
};
