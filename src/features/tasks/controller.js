import { showToast } from "../../components/toast/Toast";
import { taskState } from "../../state/task";
import { validateTaskTitle } from "../../utils";

export const TaskController = {
  createNewTask(formData) {
    const validation = validateTaskTitle(formData.title);

    if (!validation.isValid) {
      showToast(validation.error || "Please provide a valid title", "error");
      return false;
    }

    taskState.addTask({ ...formData, title: validation.value });
    showToast("Task create successfully!", "success");
    return true;
  },

  toggleTaskStatus(taskId) {
    taskState.toggleCompleted(taskId);
    showToast("Task status updated!", "info");
  },

  toggleFavoriteTask(taskId) {
    taskState.toggleFavorite(taskId);
    showToast("Favorite updated!", "info");
  },

  removeTask(taskId) {
    taskState.deleteTask(taskId);
    showToast("Task deleted successfully!", "error");
  },

  editTask(taskId, updatedFields) {
    taskState.updateTask(taskId, updatedFields);
    showToast("Task updated successfully!", "success");
  },
};
