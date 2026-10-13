import "./task-modal.css";
import { Modal } from "../../../../components";
import { createElement } from "../../../../utils";
import { TaskDetail } from "../task-detail/TaskDetail";
import { TaskForm } from "../task-form/TaskForm";

export const TaskModal = ({
  mode = "create",
  task = null,

  values = task || {},
  errors = {},

  onSubmit,
  onClose,
  onFormInput,
  onFormChange,

  onEdit,
  onFavorite,
  onArchive,
  onDelete,

  onAddSubtask,
  onToggleSubtask,
  onStartEdit,
  onCancelEdit,
  onUpdateSubtask,
  onRemoveSubtask,
} = {}) => {
  const isEdit = mode === "edit";
  const isDetail = mode === "detail";

  let content;

  if (isDetail) {
    content = createElement("div", {
      className: "task-modal__body",
      children: [
        TaskDetail({
          task,
          onClose,
          onEdit,
          onFavorite,
          onArchive,
          onDelete,

          subtasks: values.subtasks,
          total: values.total,
          completed: values.completed,
          progress: values.progress,

          onAddSubtask: (subtaskData) => {
            onAddSubtask?.(task.id, subtaskData);
          },
          onToggleSubtask: (subtaskId) => {
            onToggleSubtask?.(task.id, subtaskId);
          },
          onStartEdit: (subtaskId) => {
            onStartEdit?.(task.id, subtaskId);
          },
          onCancelEdit: (subtaskId) => {
            onCancelEdit?.(task.id, subtaskId);
          },
          onUpdateSubtask: (subtaskId, changes) => {
            onUpdateSubtask?.(task.id, subtaskId, changes);
          },
          onRemoveSubtask: (subtaskId) => {
            onRemoveSubtask?.(task.id, subtaskId);
          },
        }),
      ],
    });
  } else {
    content = TaskForm({
      task,
      values,
      errors,

      subtasks: values.subtasks,
      total: values.subtasksCount,
      completed: values.completedSubtasksCount,
      progress: values.progress,

      submitLabel: isEdit ? "Update Task" : "Create Task",

      onSubmit,
      onCancel: onClose,

      onInput: onFormInput,
      onChange: onFormChange,

      onAddSubtask: (subtaskData) => {
        onAddSubtask?.(task?.id, subtaskData);
      },
      onToggleSubtask: (subtaskId) => {
        onToggleSubtask?.(task?.id, subtaskId);
      },
      onStartEditSubtask: (subtaskId) => {
        onStartEdit?.(task?.id, subtaskId);
      },
      onCancelEditSubtask: (subtaskId) => {
        onCancelEdit?.(task?.id, subtaskId);
      },
      onUpdateSubtask: (subtaskId, changes) => {
        onUpdateSubtask?.(task?.id, subtaskId, changes);
      },
      onRemoveSubtask: (subtaskId) => {
        onRemoveSubtask?.(task?.id, subtaskId);
      },
    });
  }

  return Modal({
    open: true,
    isOpen: true,
    title: isDetail ? "Task Details" : isEdit ? "Edit Task" : "Create Task",
    variant: isDetail ? "drawer" : "modal",
    position: isDetail ? "right" : "center",
    children: content,
    onClose: () => onClose?.(),
  });
};
