import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "../../../constants";
import { generateUUID } from "../../../utils";
import { settingsService } from "../../settings/service/SettingsService";

class TaskFactory {
  #now = () => new Date().toISOString();
  #mapSubtasks = (task, transformFn) => {
    const subtasks = (task.subtasks || []).map(transformFn);
    return this.update(task, { subtasks });
  };
  #getPreferences = () => {
    const prefs = settingsService.getTaskPreferences() || {};
    return {
      priority: prefs.defaultPriority || TASK_PRIORITY?.MEDIUM,
      status: prefs.defaultStatus || TASK_STATUS?.TODO,
    };
  };

  createInitialState = () => {
    const prefs = this.#getPreferences();

    return {
      title: "",
      description: "",
      category: TASK_CATEGORY?.PERSONAL,
      priority: prefs.priority,
      status: prefs.status,
      dueDate: null,
      subtasks: [],
    };
  };

  appendSubtaskToDraft = (draftTask = {}, subtaskData = {}) => {
    const rawTitle =
      typeof subtaskData === "string" ? subtaskData : subtaskData.title;
    if (!rawTitle?.trim()) return draftTask;

    const payload =
      typeof subtaskData === "string" ? { title: rawTitle } : subtaskData;

    return {
      ...draftTask,
      subtasks: [...(draftTask.subtasks || []), this.createSubtask(payload)],
    };
  };

  toggleDraftSubtask = (draftTask = {}, subtaskId) => ({
    ...draftTask,
    subtasks: (draftTask.subtasks || []).map((st) =>
      st.id === subtaskId
        ? { ...st, completed: !st.completed, updatedAt: this.#now }
        : st,
    ),
  });

  removeDraftSubtask = (draftTask = {}, subtaskId) => ({
    ...draftTask,
    subtasks: (draftTask.subtasks || []).filter((st) => st.id !== subtaskId),
  });

  // Main CRUD Operations
  create = (taskData = {}) => {
    const prefs = this.#getPreferences();
    const timestamp = this.#now();

    const task = {
      id: generateUUID(),
      title: taskData.title?.trim() || "",
      description: taskData.description?.trim() || "",

      category: taskData.category || TASK_CATEGORY?.PERSONAL,
      priority: taskData.priority || prefs.priority,
      status: taskData.status || prefs.status,

      dueDate: taskData.dueDate || null,

      favorite: Boolean(taskData.favorite),
      archived: false,

      subtasks: Array.isArray(taskData.subtasks)
        ? taskData.subtasks.map(this.createSubtask)
        : [],

      createdAt: timestamp,
      updatedAt: timestamp,
      completedAt: taskData.status === TASK_STATUS.COMPLETED ? timestamp : null,
    };

    return this.syncStatusFromSubtasks(task);
  };

  update = (task, changes = {}) => {
    const timestamp = this.#now();
    const updatedTask = {
      ...task,
      ...changes,
      title: changes.title !== undefined ? changes.title.trim() : task.title,
      description:
        changes.description !== undefined
          ? changes.description.trim()
          : task.description,
      favorite:
        changes.favorite !== undefined
          ? Boolean(changes.favorite)
          : task.favorite,
      archived:
        changes.archived !== undefined
          ? Boolean(changes.archived)
          : task.archived,
      updatedAt: timestamp,
    };

    if (changes.subtasks) {
      updatedTask.subtasks = Array.isArray(changes.subtasks)
        ? changes.subtasks.map(this.createSubtask)
        : [];
    }

    return this.syncStatusFromSubtasks(updatedTask);
  };

  syncStatusFromSubtasks = (task) => {
    const subtasks = task.subtasks || [];
    const timestamp = this.#now();

    if (subtasks.length === 0) {
      const isCompleted = task.status === TASK_STATUS.COMPLETED;
      return {
        ...task,
        status: isCompleted ? TASK_STATUS.COMPLETED : TASK_STATUS.TODO,
        completedAt: isCompleted ? task.completedAt || timestamp : null,
      };
    }

    const completedCount = subtasks.filter(
      (subtask) => subtask.completed,
    ).length;

    if (completedCount === 0) {
      return {
        ...task,
        status: TASK_STATUS.TODO,
        completedAt: null,
      };
    }

    if (completedCount === subtasks.length) {
      return {
        ...task,
        status: TASK_STATUS.COMPLETED,
        completedAt: task.completedAt || timestamp,
      };
    }

    return {
      ...task,
      status: TASK_STATUS.IN_PROGRESS,
      completedAt: null,
    };
  };

  // Status & Property Mutators
  toggleCompleted = (task) => {
    const subtasks = task.subtasks || [];
    const timestamp = this.#now();

    if (subtasks.length === 0) {
      const isCompleted = task.status === TASK_STATUS.COMPLETED;
      return this.update(task, {
        status: isCompleted ? TASK_STATUS.TODO : TASK_STATUS.COMPLETED,
        completedAt: isCompleted ? null : timestamp,
      });
    }

    const shouldComplete = !subtasks.every((subtask) => subtask.completed);
    return this.#mapSubtasks(task, (subtask) => ({
      ...subtask,
      completed: shouldComplete,
      updatedAt: timestamp,
    }));
  };

  setStatus = (task, status) =>
    status === TASK_STATUS.COMPLETED
      ? this.completeTask(task)
      : this.update(task, { status, completedAt: null });

  completeTask = (task) => {
    const timestamp = this.#now();
    const updatedSubtasks = (task.subtasks || []).map((subtask) => ({
      ...subtask,
      completed: true,
      updatedAt: timestamp,
    }));

    return this.update(task, {
      subtasks: updatedSubtasks,
      status: TASK_STATUS.COMPLETED,
      completedAt: task.completedAt || timestamp,
    });
  };

  // subtask Mutators
  toggleSubtask = (task, subtaskId) =>
    this.#mapSubtasks(task, (subtask) =>
      subtask.id === subtaskId
        ? {
            ...subtask,
            completed: !subtask.completed,
            updatedAt: this.#now(),
          }
        : subtask,
    );

  addSubtask = (task, data = {}) => {
    const title = data.title?.trim();
    if (!title) return task;

    return this.update(task, {
      subtasks: [...(task.subtasks || []), this.createSubtask(data)],
    });
  };

  updateSubtask = (task, subtaskId, changes = {}) =>
    this.#mapSubtasks(task, (subtask) => {
      if (subtask.id !== subtaskId) return subtask;
      return {
        ...subtask,
        ...changes,
        title:
          changes.title !== undefined ? changes.title.trim() : subtask.title,
        updatedAt: this.#now(),
      };
    });

  removeSubtask = (task, subtaskId) =>
    this.update(task, {
      subtasks: (task.subtasks || []).filter(
        (subtask) => subtask.id !== subtaskId,
      ),
    });

  // Dynamic Property Updaters
  toggleFavorite = (task) => this.update(task, { favorite: !task.favorite });

  toggleArchive = (task) => this.update(task, { archived: !task.archived });

  setPriority = (task, priority) => this.update(task, { priority });

  setCategory = (task, category) => this.update(task, { category });

  setDueDate = (task, dueDate) => this.update(task, { dueDate });

  // Subtask & Object Utilities
  createSubtask = (data = {}) => {
    const timestamp = this.#now();
    return {
      id: data.id || generateUUID(),
      title: data.title?.trim() || "",
      completed: Boolean(data.completed),
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp,
    };
  };

  clone = (task) => structuredClone(task);
}

export const taskFactory = new TaskFactory();
