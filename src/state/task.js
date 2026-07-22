import { SAMPLE_TASKS } from "../store/sample-tasks";

let tasks = [...SAMPLE_TASKS];
let activeCategory = "All";
let listeners = [];

export const taskState = {
  getTasks() {
    if (activeCategory === "All") return tasks;
    return tasks.filter(
      (task) => task.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  },

  getAllTasks() {
    return tasks;
  },

  getCategories() {
    const categories = Array.from(new Set(tasks.map((t) => t.category)));
    return ["All", ...categories];
  },

  getActiveCategory() {
    return activeCategory;
  },

  setCategory(category) {
    activeCategory = category;
    this._notify();
  },

  toggleTask(taskId, isCompleted) {
    tasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: isCompleted } : t,
    );
    this._notify();
  },

  addTask(newTask) {
    tasks = [newTask, ...tasks];
    this._notify();
  },

  daleteTask(taskId) {
    tasks = tasks.filter((t) => t.id !== taskId);
    this._notify();
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  _notify() {
    listeners.forEach((listener) => listener(tasks));
  },
};
