import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "../../../constants";

class TaskValidation {
  validate(task = {}) {
    const errors = {};
    const title = typeof task.title === "string" ? task.title.trim() : "";

    if (!title) {
      errors.title = "Task title is required.";
    } else if (title.length > 100) {
      errors.title = "Task title must be 100 characters or less.";
    }

    if (task.description && typeof task.description !== "string") {
      errors.description = "Description must be text.";
    }

    if (task.description && task.description.length > 1000) {
      errors.description = "Description must be 1000 characters or less.";
    }

    if (
      task.priority &&
      !Object.values(TASK_PRIORITY).includes(task.priority)
    ) {
      errors.priority = `Invalid priority.`;
    }

    if (task.status && !Object.values(TASK_STATUS).includes(task.status)) {
      errors.status = `Invalid status.`;
    }

    if (
      task.category &&
      !Object.values(TASK_CATEGORY).includes(task.category)
    ) {
      errors.category = `Invalid category.`;
    }

    if (task.dueDate) {
      const date = new Date(task.dueDate);

      if (Number.isNaN(date.getTime())) {
        errors.dueDate = `Invalid due date.`;
      }
    }

    if (task.subtasks && !Array.isArray(task.subtasks)) {
      errors.subtasks = "Subtasks must be an array.";
    }

    if (Array.isArray(task.subtasks)) {
      task.subtasks.forEach((subtask, index) => {
        if (!subtask.title?.trim()) {
          errors[`subtasks.${index}`] = "Subtask title is required.";
        }
      });
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

export const taskValidation = new TaskValidation();
