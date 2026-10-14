import { STORAGE_KEY, TASK_STATUS } from "../../../constants";
import { SAMPLE_TASKS } from "../../../data/sample-tasks";
import { notificationService, StorageService } from "../../../services";
import { taskState } from "../../../state";
import { taskFactory } from "./TaskFactory";
import { taskQuery } from "./TaskQuery";
import { taskValidation } from "./TaskValidation";

class TaskService {
  // State & Store Accessors
  getAll = () => taskState.getTasks();
  getById = (id) => this.getAll().find((task) => task.id === id) || null;
  persist = () => StorageService.set(STORAGE_KEY.TASKS, this.getAll());
  save = (tasks = []) => (taskState.setTasks(tasks), this.persist());

  // Notification Helpers
  notifyError = (msg) => (notificationService.error(msg), null);
  notifySuccess = (msg, value = true) => (
    notificationService.success(msg),
    value
  );

  initialize = () => {
    const stored = StorageService.get(STORAGE_KEY.TASKS, []);
    Array.isArray(stored) && stored.length
      ? taskState.setTasks(stored)
      : this.save(SAMPLE_TASKS);
  };

  // Queries
  query = ({ params } = {}) =>
    taskQuery.query({ tasks: this.getAll(), ...params });
  getTodo = () => taskQuery.todo(this.getAll());
  getInProgress = () => taskQuery.inProgress(this.getAll());
  getCompleted = () => taskQuery.completed(this.getAll());
  getFavorites = () => taskQuery.favorites(this.getAll());
  getArchived = () => taskQuery.archived(this.getAll());
  getUpcoming = (limit = 5) =>
    taskQuery.upcoming(this.getAll()).slice(0, limit);
  getOverdue = (limit = 5) => taskQuery.overdue(this.getAll()).slice(0, limit);

  // Single Task Mutations
  add = (taskData = {}) => {
    const validation = taskValidation.validate(taskData);
    if (!validation.valid)
      return this.notifyError(Object.values(validation.errors)[0]);

    const task = taskFactory.create(taskData);
    this.save([task, ...this.getAll()]);
    return this.notifySuccess("Task Created.", task);
  };

  update = (id, changes) => {
    const task = this.getById(id);
    if (!task) return this.notifyError("Task not found.");

    const updatedTask = taskFactory.update(task, changes);
    const validation = taskValidation.validate(updatedTask);
    if (!validation.valid)
      return this.notifyError(Object.values(validation.errors)[0]);

    this.save(
      this.getAll().map((item) => (item.id === id ? updatedTask : item)),
    );
    return this.notifySuccess("Task updated.", updatedTask);
  };

  delete = (id) => {
    if (!this.getById(id)) return this.notifyError("Task not found.") || false;
    this.save(this.getAll().filter((task) => task.id !== id));
    return this.notifySuccess("Task deleted.");
  };

  replaceTask = (updatedTask) => {
    if (!updatedTask?.id) return null;
    this.save(
      this.getAll().map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
    return updatedTask;
  };

  mutateTask = (id, factoryfn, ...args) => {
    const task = this.getById(id);
    if (!task) return this.notifyError("Task not found.");
    return this.replaceTask(factoryfn(task, ...args));
  };

  // Delegated Factory Mutators
  toggleCompleted = (id) => this.mutateTask(id, taskFactory.toggleCompleted);
  setStatus = (id, status) =>
    this.mutateTask(id, taskFactory.setStatus, status);
  toggleFavorite = (id) => this.mutateTask(id, taskFactory.toggleFavorite);
  toggleArchive = (id) => this.mutateTask(id, taskFactory.toggleArchive);
  setPriority = (id, priority) =>
    this.mutateTask(id, taskFactory.setPriority, priority);
  setCategory = (id, category) =>
    this.mutateTask(id, taskFactory.setCategory, category);
  setDueDate = (id, dueDate) =>
    this.mutateTask(id, taskFactory.setDueDate, dueDate);

  // Subtask Mutations
  addSubtask = (taskId, data) =>
    this.mutateTask(taskId, taskFactory.addSubtask, data);
  toggleSubtask = (taskId, subtaskId) =>
    this.mutateTask(taskId, taskFactory.toggleSubtask, subtaskId);
  updateSubtask = (taskId, subtaskId, changes) =>
    this.mutateTask(taskId, taskFactory.updateSubtask, subtaskId, changes);
  removeSubtask = (taskId, subtaskId) =>
    this.mutateTask(taskId, taskFactory.removeSubtask, subtaskId);

  // DRY Helper
  #processModalSubtask = (
    modalState,
    draftActionFn,
    serviceActionFn,
    ...args
  ) => {
    const { mode, task } = modalState;
    if (mode === "create" || !task?.id) {
      return { ...modalState, task: draftActionFn(task, ...args) };
    }
    serviceActionFn(task.id, ...args);
    return { ...modalState, task: this.getById(task.id) };
  };

  handleModalAddSubtask = (modalState, subtaskData) =>
    this.#processModalSubtask(
      modalState,
      taskFactory.appendSubtaskToDraft,
      this.addSubtask,
      subtaskData,
    );

  handleModalToggleSubtask = (modalState, subtaskId) =>
    this.#processModalSubtask(
      modalState,
      taskFactory.toggleDraftSubtask,
      this.toggleSubtask,
      subtaskId,
    );

  handleModalRemoveSubtask = (modalState, subtaskId) =>
    this.#processModalSubtask(
      modalState,
      taskFactory.removeDraftSubtask,
      this.removeSubtask,
      subtaskId,
    );

  // Bulk Operations
  #executeBulk = (ids, transformOrFilterFn, successMsg) => {
    if (!ids?.length) return false;
    this.save(transformOrFilterFn(this.getAll(), new Set(ids)));
    return this.notifySuccess(`${ids.length} ${successMsg}`);
  };

  deleteMany = (ids = []) =>
    this.#executeBulk(
      ids,
      (tasks, idSet) => tasks.filter((t) => !idSet.has(t.id)),
      "task deleted.",
    );

  completeMany = (ids = []) =>
    this.#executeBulk(
      ids,
      (tasks, idSet) =>
        tasks.map((task) =>
          idSet.has(task.id)
            ? taskFactory.setStatus(task, TASK_STATUS.COMPLETED)
            : task,
        ),
      "tasks completed",
    );

  archiveMany = (ids = []) =>
    this.#executeBulk(
      ids,
      (tasks, idSet) =>
        tasks.map((task) =>
          idSet.has(task.id)
            ? taskFactory.update(task, { archived: true })
            : task,
        ),
      "tasks archived",
    );

  clearCompleted = () => {
    this.save(
      this.getAll().filter((task) => task.status !== TASK_STATUS.COMPLETED),
    );
    return this.notifySuccess("Completed tasks removed.");
  };

  clearArchived = () => {
    this.save(this.getAll().filter((task) => !task.archived));
    return this.notifySuccess("Archived tasks removed.");
  };

  deleteAll = () => (this.save([]), this.notifySuccess("All tasks removed."));
}

export const taskService = new TaskService();
