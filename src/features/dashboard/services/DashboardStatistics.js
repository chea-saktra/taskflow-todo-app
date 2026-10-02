import { TASK_PRIORITY, TASK_STATUS } from "../../../constants";
import { taskState } from "../../../state";

class DashboardStatistics {
  getAllTasks() {
    return taskState.getTasks();
  }

  getOverview() {
    const tasks = this.getAllTasks();

    const total = tasks.length;

    const todo = tasks.filter(
      (task) => task.status === TASK_STATUS.TODO,
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === TASK_STATUS.IN_PROGRESS,
    ).length;

    const completed = tasks.filter(
      (task) => task.status === TASK_STATUS.COMPLETED,
    ).length;

    const overdue = tasks.filter((task) => {
      if (!task.dueDate || task.status === TASK_STATUS.COMPLETED) return false;
      return new Date(task.dueDate) < new Date();
    }).length;

    const favorites = tasks.filter((task) => task.favorite).length;

    const archived = tasks.filter((task) => task.archived).length;

    return {
      total,
      todo,
      inProgress,
      completed,
      overdue,
      favorites,
      archived,
    };
  }

  getProgress() {
    const { total, todo, inProgress, archived, completed } = this.getOverview();

    return {
      total,
      todo,
      inProgress,
      archived,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  getStatus() {
    const tasks = this.getAllTasks();

    return {
      todo: tasks.filter((task) => task.status === TASK_STATUS.TODO).length,

      inProgress: tasks.filter(
        (task) => task.status === TASK_STATUS.IN_PROGRESS,
      ).length,

      completed: tasks.filter((task) => task.status === TASK_STATUS.COMPLETED)
        .length,
    };
  }

  getPriority() {
    const tasks = this.getAllTasks();

    return {
      high: tasks.filter((task) => task.priority === TASK_PRIORITY.HIGH).length,

      medium: tasks.filter((task) => task.priority === TASK_PRIORITY.MEDIUM)
        .length,

      low: tasks.filter((task) => task.priority === TASK_PRIORITY.LOW).length,
    };
  }

  getCategory() {
    const tasks = this.getAllTasks();

    return tasks.reduce((result, task) => {
      const category = task.category || "uncategorized";

      result[category] = (result[category] || 0) + 1;

      return result;
    }, {});
  }
}

export const dashboardStatistics = new DashboardStatistics();
