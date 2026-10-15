import { TASK_STATUS } from "../../../constants";
import { settingsService } from "../../settings/service/SettingsService";

class TaskQuery {
  search(tasks = [], keyword = "") {
    const query = keyword.trim().toLowerCase();
    if (!query) return [...tasks];

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const category = task.category?.toLowerCase() || "";
      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }

  filter(tasks = [], filters = {}) {
    const { category = "all", priority = "all", status = "all" } = filters;

    return tasks.filter((task) => {
      const categoryMatch =
        category === "all" || !category || task.category === category;

      const priorityMatch =
        priority === "all" || !priority || task.priority === priority;

      const statusMatch = status === "all" || !status || task.status === status;

      return categoryMatch && priorityMatch && statusMatch;
    });
  }

  byView(tasks = [], view = "all") {
    const showCompleted = settingsService.shouldShowCompleted();

    switch (view) {
      case TASK_STATUS.TODO:
        return tasks.filter(
          (task) => task.status === TASK_STATUS.TODO && !task.archived,
        );

      case TASK_STATUS.IN_PROGRESS:
        return tasks.filter(
          (task) => task.status === TASK_STATUS.IN_PROGRESS && !task.archived,
        );

      case TASK_STATUS.COMPLETED:
        return tasks.filter((task) => task.status === TASK_STATUS.COMPLETED);

      case "favorites":
        return tasks.filter((task) => task.favorite && !task.archived);

      case "archived":
        return tasks.filter((task) => task.archived);

      case "all":
      default:
        return tasks.filter((task) => {
          if (task.archived) return false;
          if (!showCompleted && task.status === TASK_STATUS.COMPLETED) {
            return false;
          }
          return true;
        });
    }
  }

  sort(tasks = [], sortBy = "createdAt", sortOrder = "desc") {
    const sorted = [...tasks];

    sorted.sort((a, b) => {
      const valueA = this.getSortValue(a, sortBy);
      const valueB = this.getSortValue(b, sortBy);

      const comparison = this.compare(valueA, valueB);

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }

  getSortValue(task, sortBy) {
    switch (sortBy) {
      case "title":
        return task.title?.toLowerCase() || "";

      case "priority":
        return this.getPriorityWeight(task.priority);

      case "status":
        return this.getStatusWeight(task.status);

      case "category":
        return task.category?.toLowerCase() || "";

      case "dueDate":
        return task.dueDate
          ? new Date(task.dueDate).getTime()
          : Number.POSITIVE_INFINITY;

      case "updatedAt":
        return task.updatedAt ? new Date(task.updatedAt).getTime() : 0;

      case "createdAt":
      default:
        return task.createdAt ? new Date(task.createdAt).getTime() : 0;
    }
  }

  compare(a, b) {
    if (a === b) return 0;

    if (a === null || a === undefined) {
      return -1;
    }

    if (b === null || b === undefined) {
      return 1;
    }

    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }

    return a > b ? 1 : -1;
  }

  getPriorityWeight(priority) {
    const weights = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return weights[priority] || 0;
  }

  getStatusWeight(status) {
    const weights = {
      [TASK_STATUS.TODO]: 1,
      [TASK_STATUS.IN_PROGRESS]: 2,
      [TASK_STATUS.COMPLETED]: 3,
    };
    return weights[status] || 0;
  }

  todo(tasks = []) {
    return tasks.filter(
      (task) => task.status === TASK_STATUS.TODO && !task.archived,
    );
  }

  inProgress(tasks = []) {
    return tasks.filter(
      (task) => task.status === TASK_STATUS.IN_PROGRESS && !task.archived,
    );
  }

  completed(tasks = []) {
    return tasks.filter((task) => task.status === TASK_STATUS.COMPLETED);
  }

  favorites(tasks = []) {
    return tasks.filter((task) => task.favorite && !task.archived);
  }

  archived(tasks = []) {
    return tasks.filter((task) => task.archived);
  }

  withDueDate(tasks = []) {
    return tasks.filter((task) => Boolean(task.dueDate));
  }

  overdue(tasks = [], now = new Date()) {
    const currentTime = new Date(now).getTime();

    return tasks.filter((task) => {
      if (task.archived) return false;
      if (task.status === TASK_STATUS.COMPLETED) return false;
      if (!task.dueDate) return false;

      return new Date(task.dueDate).getTime() < currentTime;
    });
  }

  upcoming(tasks = [], now = new Date()) {
    const currentTime = new Date(now).getTime();

    return tasks.filter((task) => {
      if (task.archived) return false;
      if (task.status === TASK_STATUS.COMPLETED) return false;
      if (!task.dueDate) return false;

      return new Date(task.dueDate).getTime() >= currentTime;
    });
  }

  withSubtasks(tasks = []) {
    return tasks.filter(
      (task) => Array.isArray(task.subtasks) && task.subtasks.length > 0,
    );
  }

  withPendingSubtasks(tasks = []) {
    return tasks.filter((task) =>
      (task.subtasks || []).some((subtask) => !subtask.completed),
    );
  }

  withCompletedSubtasks(tasks = []) {
    return tasks.filter((task) => {
      const subtasks = task.subtasks || [];

      return (
        subtasks.length > 0 && subtasks.every((subtask) => subtask.completed)
      );
    });
  }

  query({
    tasks = [],
    keyword = "",
    filters = {},
    view = "all",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = {}) {
    let result = [...tasks];

    if (keyword) {
      result = this.search(result, keyword);
    }

    result = this.byView(result, view);
    result = this.filter(result, filters);
    result = this.sort(result, sortBy, sortOrder);

    return result;
  }
}
export const taskQuery = new TaskQuery();
