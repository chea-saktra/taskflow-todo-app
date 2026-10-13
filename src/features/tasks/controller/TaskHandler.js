// src/features/tasks/controllers/TaskHandler.js
import { taskService } from "../services/TaskService";
import { taskFactory } from "../services/TaskFactory";
import { enhanceTaskForUI } from "../config/taskConfig";

export class TaskHandlers {
  constructor(stateStore, renderFn, updateListFn) {
    this.store = stateStore;
    this.render = renderFn;
    this.updateTaskList = updateListFn;
  }

  #updateModalTask(task) {
    if (!this.store.modal?.open) return;
    const cloned = taskFactory.clone(task);
    this.store.modal.task = cloned;
    this.store.modal.values = enhanceTaskForUI(cloned);
  }

  handleSearch = (keyword = "") => {
    this.store.setSearchQuery(keyword);
    this.updateTaskList ? this.updateTaskList() : this.render();
  };

  handleFilter = (filters = {}) => {
    this.store.updateFilters(filters);
    this.render();
  };

  handleReset = () => {
    this.store.resetState();
    this.render();
  };

  handleViewChange = (view = "all") => {
    this.store.setView(view);
    this.render();
  };

  handleSortChange = (sortBy, sortOrder) => {
    this.store.setSorting(sortBy, sortOrder);
    this.render();
  };

  handleToggleSelectMode = () => {
    this.store.toggleSelectMode();
    this.render();
  };

  handleSelectTask = (taskId) => {
    this.store.toggleSelect(taskId);
    this.render();
  };

  handleSelectAll = (allTasks = []) => {
    const allIds = allTasks.map((task) => task.id);
    if (typeof this.store.toggleSelectAll === "function") {
      this.store.toggleSelectAll(allIds);
    } else {
      const isAllSelected = this.store.selectedIds.length === allIds.length;
      this.store.selectedIds = isAllSelected ? [] : [...allIds];
    }
    this.render();
  };

  handleOpenCreateModal = () => {
    const initialDraft = taskFactory.createInitialState();
    this.store.setModal(true, "create", initialDraft);
    this.render();
  };

  handleOpenModalMode = (task, mode) => {
    if (!task) return;
    const taskId = typeof task === "string" ? task : task.id;
    const selectedTask = taskService.getById(taskId);
    if (!selectedTask) return;

    this.store.setModal(true, mode, taskFactory.clone(selectedTask));
    this.#updateModalTask(selectedTask);
    this.render();
  };

  handleOpenEditModal = (task) => this.handleOpenModalMode(task, "edit");
  handleOpenDetailModal = (task) => this.handleOpenModalMode(task, "detail");

  handleCloseModal = () => {
    this.store.setModal(false, "create", null);
    if (typeof this.store.setEditingSubtaskId === "function") {
      this.store.setEditingSubtaskId(null);
    }
    this.render();
  };

  handleFormInput = (e) => {
    const { name, value } = e.target;
    if (this.store.modal?.task && name) {
      this.store.modal.task[name] = value;
    }
  };

  handleFormChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (this.store.modal?.task && name) {
      this.store.modal.task[name] = type === "checkbox" ? checked : value;
      this.render();
    }
  };

  handleSubmitTask = (formData = {}) => {
    let result = null;
    const { mode, task } = this.store.modal;

    if (mode === "create") {
      result = taskService.add({ ...task, ...formData });
    } else if (mode === "edit" && task?.id) {
      result = taskService.update(task.id, formData);
    }

    if (result) this.handleCloseModal();
  };

  handleToggleTask = (taskId) => {
    if (!taskId) return;
    taskService.toggleCompleted(taskId);
    this.render();
  };

  handleToggleFavorite = (taskId) => {
    if (!taskId) return;
    taskService.toggleFavorite(taskId);
    this.#updateModalTask(taskService.getById(taskId));
    this.render();
  };

  handleArchiveTask = (taskId) => {
    if (!taskId) return;
    taskService.toggleArchive(taskId);
    this.store.deselect(taskId);
    this.render();
  };

  handleDeleteTask = (taskId) => {
    if (!taskId) return;
    if (taskService.delete(taskId)) {
      this.store.deselect(taskId);
      this.render();
    }
  };

  // Subtask Handlers
  handleAddSubtask = (_, subtaskData) => {
    this.store.modal = taskService.handleModalAddSubtask(
      this.store.modal,
      subtaskData,
    );
    this.#updateModalTask(this.store.modal.task);
    this.render();
  };

  handleToggleSubtask = (_, subtaskId) => {
    this.store.modal = taskService.handleModalToggleSubtask(
      this.store.modal,
      subtaskId,
    );
    this.#updateModalTask(this.store.modal.task);
    this.render();
  };

  handleStartEditSubtask = (_, subtaskId) => {
    if (this.store.modal?.task?.subtasks) {
      this.store.modal.task.subtasks = this.store.modal.task.subtasks.map(
        (sub) => ({ ...sub, isEditing: sub.id === subtaskId }),
      );
    }
    this.store.setEditingSubtaskId?.(subtaskId);
    this.#updateModalTask(this.store.modal.task);
    this.render();
  };

  handleCancelEditSubtask = () => {
    if (this.store.modal?.task?.subtasks) {
      this.store.modal.task.subtasks = this.store.modal.task.subtasks.map(
        (sub) => ({
          ...sub,
          isEditing: false,
        }),
      );
    }
    this.store.setEditingSubtaskId?.(null);
    this.#updateModalTask(this.store.modal.task);
    this.render();
  };

  handleUpdateSubtask = (taskId, subtaskId, changes) => {
    if (taskId && typeof taskService.updateSubtask === "function") {
      taskService.updateSubtask(taskId, subtaskId, changes);
    }

    const { task } = this.store.modal;
    if (task && task.subtasks) {
      task.subtasks = task.subtasks.map((sub) =>
        sub.id === subtaskId ? { ...sub, ...changes, isEditing: false } : sub,
      );
    }


    this.store.setEditingSubtaskId?.(null);
    const latestTask = taskId ? taskService.getById(taskId) : task;
    this.#updateModalTask(latestTask);
    this.render();
  };

  handleRemoveSubtask = (_, subtaskId) => {
    this.store.modal = taskService.handleModalRemoveSubtask(
      this.store.modal,
      subtaskId,
    );
    this.#updateModalTask(this.store.modal.task);
    this.render();
  };

  #executeBulkAction = (actionFn) => {
    const ids = this.store.selectedIds;
    if (!ids.length) return;
    actionFn(ids);
    this.store.clearSelection();
    this.render();
  };

  handleCompleteSelected = () =>
    this.#executeBulkAction((ids) => taskService.completeMany(ids));

  handleArchiveSelected = () =>
    this.#executeBulkAction((ids) => taskService.toggleArchive(ids));

  handleDeleteSelected = () =>
    this.#executeBulkAction((ids) => taskService.deleteMany(ids));
}
