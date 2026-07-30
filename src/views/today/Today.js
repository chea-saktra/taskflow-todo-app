import { EmptyState } from "../../components/empty-state/EmptyState";
import { Fab } from "../../components/fab/Fab";
import { TaskCard } from "../../components/task-card/TaskCard";
import { TaskController } from "../../features/tasks/controller";
import { taskState } from "../../state/task";
import { createElement, openTaskModal } from "../../utils";
import "./today.css";

export const TodayView = () => {
  const container = createElement("section", {
    className: "today-view",
  });

  const renderContent = () => {
    container.innerHTML = "";

    const allTasks = taskState.getTasks();
    const todayStr = new Date().toISOString().split("T")[0];

    const todayTasks = allTasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDateStr = new Date(task.dueDate).toISOString().split("T")[0];
      return taskDateStr === todayStr && !task.completed;
    });

    const taskContainer = createElement("div", {
      className: "today-view__list",
    });

    if (todayTasks.length === 0) {
      const emptyState = EmptyState({
        icon: "sun",
        title: "All clear for today!",
        description: "No tasks due today. Enjoy your day or add a new task.",
      });
      taskContainer.append(emptyState);
    } else {
      todayTasks.forEach((task) => {
        const card = TaskCard({
          task,
          onToggle: (id, isChecked) =>
            TaskController.toggleTaskStatus(id, isChecked),
          onFavorite: (id) => TaskController.toggleFavoriteTask(id),
          onEdit: (taskData) => openTaskModal(taskData),
          onDelete: (id) => TaskController.removeTask(id),
        });
        taskContainer.append(card);
      });
    }
    const btnFab = Fab({ onClick: () => openTaskModal() });

    container.append(taskContainer, btnFab);
  };

  taskState.subscribe(() => renderContent());

  renderContent();

  return container;
};
