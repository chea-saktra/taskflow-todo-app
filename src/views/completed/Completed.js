import { EmptyState } from "../../components/empty-state/EmptyState";
import { Fab } from "../../components/fab/Fab";
import { TaskCard } from "../../components/task-card/TaskCard";
import { TaskController } from "../../features/tasks/controller";
import { taskState } from "../../state/task";
import { openTaskModal } from "../../utils";
import { createElement } from "../../utils/dom";
import "./completed.css";

export const CompletedView = () => {
  const container = createElement("section", {
    className: "completed-view",
  });
  const renderContent = () => {
    container.innerHTML = "";

    const allTasks = taskState.getTasks();
    const completedTasks = allTasks.filter((task) => task.completed === true);

    const tasksContainer = createElement("div", {
      className: "completed-view__list",
    });
    if (completedTasks.length === 0) {
      const emptyState = EmptyState({
        icon: "check-circle",
        title: "No completed tasks yet",
        description: "Tasks you mark as done will show up here.",
      });
      tasksContainer.append(emptyState);
    } else {
      completedTasks.forEach((task) => {
        const card = TaskCard({
          task,
          isCompletedView: true,
          onToggle: (id, isChecked) =>
            TaskController.toggleTaskStatus(id, isChecked),
          onFavorite: (id) => TaskController.toggleFavoriteTask(id),
          onEdit: (taskData) => openTaskModal(taskData),
          onDelete: (id) => TaskController.removeTask(id),
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
