import { TASK_STATUS } from "../../../constants";
import { taskState } from "../../../state";

class DashboardTasks {
  getTasks() {
    return taskState.getTasks();
  }

  getUpcoming(limit = 5) {
    const tasks = this.getTasks();
    return tasks
      .filter(
        (task) =>
          task.status !== TASK_STATUS.COMPLETED &&
          !task.archived &&
          task.dueDate,
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, limit);
  }

  getOverdue(limit = 5) {
    const now = new Date();

    return this.getTasks()
      .filter(
        (task) =>
          task.status !== TASK_STATUS.COMPLETED &&
          !task.archived &&
          task.dueDate &&
          new Date(task.dueDate) < now,
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, limit);
  }

  getRecent(limit = 5) {
    return this.getTasks()
      .filter((task) => !task.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  getFavorites(limit = 5) {
    return this.getTasks()
      .filter((task) => task.favorite && !task.archived)
      .slice(0, limit);
  }
}

export const dashboardTasks = new DashboardTasks();
