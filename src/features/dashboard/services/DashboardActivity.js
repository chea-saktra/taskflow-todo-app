import { TASK_STATUS } from "../../../constants";
import { taskState } from "../../../state";

class DashboardActivity {
  getTasks() {
    return taskState.getTasks();
  }

  getProductivity() {
    const tasks = this.getTasks();

    const completed = tasks.filter(
      (task) => task.status === TASK_STATUS.COMPLETED,
    );

    const total = tasks.length;

    return {
      totalTasks: total,
      completedTasks: completed.length,
      completionRate:
        total > 0 ? Math.round((completed.length / total) * 100) : 0,
    };
  }

  getRecentActivity(limit = 5) {
    return [...this.getTasks()]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt),
      )
      .slice(0, limit);
  }
}

export const dashboardActivity = new DashboardActivity();
