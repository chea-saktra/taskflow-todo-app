import { notificationService } from "../../../services";
import { taskState } from "../../../state";

class ArchiveService {
  getTask(id) {
    const task = taskState.getTasks().find((t) => t.id === id);

    if (!task) notificationService.error("Task not found.");

    return task || null;
  }

  getFilteredAndSortedTasks(searchQuery, sortBy, sortOrder) {
    let tasks = this.getAll();

    if (searchQuery.trim()) {
      const keyword = searchQuery.trim().toLowerCase();
      tasks = tasks.filter((task) => {
        const title = task.title?.toLowerCase() || "";
        const description = task.description?.toLowerCase() || "";
        return title.includes(keyword) || description.includes(keyword);
      });
    }

    const priorityWeight = { high: 3, medium: 2, low: 1 };

    tasks.sort((a, b) => {
      let first = a[sortBy];
      let second = b[sortBy];

      if (["updatedAt", "dueDate", "createdAt"].includes(sortBy)) {
        first = new Date(first || 0).getTime();
        second = new Date(second || 0).getTime();
        return sortOrder === "asc" ? first - second : second - first;
      } else if (sortBy === "title") {
        first = (first || "").toLowerCase();
        second = (second || "").toLowerCase();
        const comparison = first.localeCompare(second);
        return sortOrder === "asc" ? comparison : -comparison;
      } else if (sortBy === "priority") {
        const weightA = priorityWeight[(first || "").toLowerCase()] || 0;
        const weightB = priorityWeight[(second || "").toLowerCase()] || 0;
        return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
      }

      return 0;
    });

    return tasks;
  }

  updateArchivedState(id, targetState, successMsg) {
    const task = this.getTask(id);
    if (!task) return null;
    if (task.archived === targetState) return task;

    const updatedTask = {
      ...task,
      archived: targetState,
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = taskState
      .getTasks()
      .map((t) => (t.id === id ? updatedTask : t));

    taskState.setTasks(updatedTasks);
    notificationService.success(successMsg);

    return updatedTask;
  }

  getAll() {
    return taskState.getTasks().filter((task) => task.archived);
  }

  getCount() {
    return this.getAll().length;
  }

  isArchived(id) {
    return Boolean(this.getTask(id)?.archived);
  }

  archive(id) {
    return this.updateArchivedState(id, true, "Task archived.");
  }

  unarchive(id) {
    return this.updateArchivedState(id, false, "Task restored.");
  }

  toggle(id) {
    return this.isArchived(id) ? this.unarchive(id) : this.archive(id);
  }

  restoreMany(ids = []) {
    if (!ids.length) return false;

    const idSet = new Set(ids);
    const now = new Date().toISOString();

    const tasks = taskState
      .getTasks()
      .map((task) =>
        idSet.has(task.id)
          ? { ...task, archived: false, updatedAt: now }
          : task,
      );

    taskState.setTasks(tasks);
    notificationService.success(`${ids.length} tasks restored.`);
    return true;
  }

  delete(id) {
    const task = this.getTask(id);
    if (!task) return false;

    const remainingTasks = taskState.getTasks().filter((t) => t.id !== id);
    taskState.setTasks(remainingTasks);
    notificationService.success("Task deleted premanently.");
    return true;
  }

  deleteMany(ids = []) {
    if (!ids.length) return false;
    const idSet = new Set(ids);
    const remainingTasks = taskState
      .getTasks()
      .filter((task) => !idSet.has(task.id));
    taskState.setTasks(remainingTasks);
    notificationService.success(`${ids.length} tasks deleted permanently.`);
    return true;
  }

  deleteAll() {
    const tasks = taskState.getTasks();
    const remainingTasks = tasks.filter((task) => !task.archived);

    if (tasks.length === remainingTasks.length) {
      notificationService.info("No archived tasks.");
      return false;
    }

    taskState.setTasks(remainingTasks);
    notificationService.success("Archived tasks deleted.");
    return true;
  }
}

export const archiveService = new ArchiveService();
