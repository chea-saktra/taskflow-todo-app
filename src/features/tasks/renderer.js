import { Button } from "../../components/button/Button";
import { openDeleteModal } from "../../components/DeleteConfirmation/DeleteConfirmation";
import { EmptyState } from "../../components/empty-state/EmptyState";
import { TaskCard } from "../../components/task-card/TaskCard";
import { createElement, renderSlot } from "../../utils";
import { openTaskModal } from "../../utils/modal-helper";
import { TaskController } from "./controller";

export const renderTaskList = (container, tasks = [], options = {}) => {
  if (!container) return;
  if (tasks.length === 0) {
    const emptyState = EmptyState({
      icon: "check-circle-2",
      title: "No Tasks Found",
      description: "You're all caught up! Create a new task to get started",
      actionButton: Button({
        text: "Create Task",
        icon: "plus",
        variant: "primary",
        events: { click: () => openTaskModal() },
      }),
    });
    renderSlot(container, emptyState);
    return;
  }

  const cardElements = tasks.map((task) => {
    return TaskCard({
      task: task,
      onToggle: (taskId) => {
        TaskController.toggleTaskStatus(taskId);
      },
      onFavorite: (taskId) => {
        TaskController.toggleFavoriteTask(taskId);
      },
      onArchive: (taskId) => {
        TaskController.toggleArchiveTask(taskId);
      },
      onEdit: (taskData) => {
        openTaskModal(taskData);
      },

      onDelete: (taskId) => {
        openDeleteModal(taskId);
      },
    });
  });
  renderSlot(container, cardElements);
};
