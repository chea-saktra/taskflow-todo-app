import { SAMPLE_TASKS } from "../data/sample-tasks";
import { StorageService } from "../services/storage";
import { generateUUID } from "../utils";

class TaskState {
  constructor() {
    const savedTasks = StorageService.getTasks();
    this.tasks = savedTasks || SAMPLE_TASKS;
    this.listeners = [];

    if (!savedTasks) StorageService.saveTasks(this.tasks);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    StorageService.saveTasks(this.tasks);
    this.listeners.forEach((listener) => listener(this.tasks));
  }

  getTasks() {
    return [...this.tasks];
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, progress };
  }

  setTasks(newTask) {
    this.tasks = [...newTask];
    this.notify();
  }

  addTask(taskData) {
    const newTask = {
      id: generateUUID(),
      completed: false,
      isFavorite: false,
      isArchived: false,
      subtasks: [],
      ...taskData,
    };
    this.tasks.unshift(newTask);
    this.notify();
    return newTask;
  }

  updateTask(id, updatedFields) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task,
    );
    this.notify();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.notify();
  }

  toggleCompleted(id) {
    const task = this.getTaskById(id);

    if (task) {
      const isNowCompleted = !task.completed;

      this.updateTask(id, {
        completed: isNowCompleted,
        completedAt: isNowCompleted ? new Date().toISOString() : null,
      });
    }
  }

  toggleFavorite(id) {
    const task = this.getTaskById(id);
    if (task) {
      this.updateTask(id, { isFavorite: !task.isFavorite });
    }
  }

  toggleArchive(id) {
    const task = this.getTaskById(id);
    if (task) {
      this.updateTask(id, { isArchived: !task.isArchived });
    }
  }
}

export const taskState = new TaskState();
