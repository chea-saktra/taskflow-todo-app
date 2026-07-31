import { openDeleteModal } from "../../components/DeleteConfirmation/DeleteConfirmation";
import { EmptyState } from "../../components/empty-state/EmptyState";
import { Fab } from "../../components/fab/Fab";
import { TaskCard } from "../../components/task-card/TaskCard";
import { TaskController } from "../../features/tasks/controller";
import { taskState } from "../../state/task";
import { createElement, openTaskModal } from "../../utils";
import "./upcoming.css";

export const UpcomingView = () => {
  const container = createElement("section", {
    className: "upcoming-view",
  });

  const renderContent = () => {
    container.innerHTML = "";

    const allTasks = taskState.getTasks();

    const toady = new Date();
    toady.setHours(0, 0, 0, 0);

    const tomorrow = new Date(toady);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const upcomingTasks = allTasks.filter((task) => {
      if (task.completed || !task.dueDate || task.isArchived) return false;
      const taskDueDate = new Date(task.dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      return taskDueDate >= tomorrow;
    });

    upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const tasksContainer = createElement("div", {
      className: "upcoming-view__list",
    });

    if (upcomingTasks.length === 0) {
      const emptyState = EmptyState({
        icon: "calendar-clock",
        title: "No upcoming tasks",
        description: "You have no tasks scheduled for the future.",
      });
      tasksContainer.append(emptyState);
    } else {
      upcomingTasks.forEach((task) => {
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
