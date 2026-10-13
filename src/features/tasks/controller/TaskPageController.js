import { EmptyState } from "../../../components";
import { TaskPage } from "../../../page/tasks/TaskPage";
import { taskState } from "../../../state/TaskState";
import { select } from "../../../utils";
import { settingsService } from "../../settings/service/SettingsService";
import { TaskList } from "../components/task-list/TaskList";
import { enhanceTaskForUI } from "../config/taskConfig";
import { taskService } from "../services/TaskService";
import { TaskHandlers } from "./TaskHandler";
import { TaskStateStore } from "./TaskStateStore";

class TaskPageController {
  constructor() {
    this.container = null;
    this.unsubscribe = null;
    this.store = new TaskStateStore();
    this.handlers = new TaskHandlers(
      this.store,
      () => this.render(),
      () => this.updateTaskList(),
    );
  }

  mount(container) {
    this.container = container;

    this.syncSettingsToStore();

    if (typeof taskState.subscribe === "function") {
      this.unsubscribe = taskState.subscribe(() => this.render());
    }
    this.render();
    return this;
  }

  unmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.container = null;
  };

  syncSettingsToStore() {
    const prefs = settingsService.getTaskPreferences() || {};
    if (prefs.defaultView) this.store.currentView = prefs.defaultView;
    if (prefs.defaultSortBy) this.store.sortBy = prefs.defaultSortBy;
    if (prefs.defaultSortOrder) this.store.sortOrder = prefs.defaultSortOrder;
  }

  getTasks() {
    const rawTasks = taskService.query({
      params: {
        keyword: this.store.searchQuery,
        filters: this.store.filters,
        view: this.store.currentView,
        sortBy: this.store.sortBy,
        sortOrder: this.store.sortOrder,
      },
    });
    return rawTasks.map(enhanceTaskForUI);
  }

  getPageProps = () => {
    const visibletasks = this.getTasks();

    return {
      tasks: visibletasks,
      search: this.store.searchQuery,
      filters: this.store.filters,
      view: this.store.currentView,
      sortBy: this.store.sortBy,
      sortOrder: this.store.sortOrder,

      // Selection Propertions
      selectedIds: this.store.selectedIds,
      isSelectionMode: this.store.isSelectionMode,
      allSelected:
        visibletasks.length > 0 &&
        this.store.selectedIds.length === visibletasks.length,

      modal: this.store.modal,

      // Search, FIlter & Reset Handlers
      onSearch: this.handlers.handleSearch,
      onFilter: this.handlers.handleFilter,
      onReset: this.handlers.handleReset,
      onViewChange: this.handlers.handleViewChange,
      onSortChange: this.handlers.handleSortChange,

      // Selection Handlers
      onSelect: this.handlers.handleSelectTask,
      onSelectAll: () => this.handlers.handleSelectAll(visibletasks),
      onToggleSelectMode: this.handlers.handleToggleSelectMode,

      // Single Task Item Handlers
      onToggle: this.handlers.handleToggleTask,
      onFavorite: this.handlers.handleToggleFavorite,
      onArchive: this.handlers.handleArchiveTask,
      onDelete: this.handlers.handleDeleteTask,

      // Modal & Form Handleers
      onAdd: this.handlers.handleOpenCreateModal,
      onEdit: this.handlers.handleOpenEditModal,
      onDetail: this.handlers.handleOpenDetailModal,
      onSubmitTask: this.handlers.handleSubmitTask,
      onCloseModal: this.handlers.handleCloseModal,
      onFormInput: this.handlers.handleFormInput,
      onFormChange: this.handlers.handleFormChange,

      // Subtask Operations Handlers
      onAddSubtask: this.handlers.handleAddSubtask,
      onToggleSubtask: this.handlers.handleToggleSubtask,
      onStartEditSubtask: this.handlers.handleStartEditSubtask,
      onCancelEditSubtask: this.handlers.handleCancelEditSubtask,
      onUpdateSubtask: this.handlers.handleUpdateSubtask,
      onRemoveSubtask: this.handlers.handleRemoveSubtask,

      // Bulk Action Handlers
      onCompleteSelected: this.handlers.handleCompleteSelected,
      onArchiveSelected: this.handlers.handleArchiveSelected,
      onDeleteSelected: this.handlers.handleDeleteSelected,
    };
  };

  updateTaskList = () => {
    if (!this.container) return;

    const taskContent = select(".task-page__content", this.container);
    if (!taskContent) return;

    const tempPage = TaskPage(this.getPageProps());
    const newContent = select(".task-page__content", tempPage);

    if (newContent) {
      taskContent.replaceChildren(...newContent.childNodes);
      window.lucide?.createIcons();
    }
  };

  render = () => {
    if (!this.container) return;

    const scrollableElem = select(".modal__body, .task-form", this.container);
    const scrollTop = scrollableElem ? scrollableElem.scrollTop : 0;

    const page = TaskPage(this.getPageProps());

    this.container.replaceChildren(page);
    window.lucide?.createIcons();

    const newScrollableElem = select(
      ".modal__body, .task-form",
      this.container,
    );
    if (newScrollableElem) {
      newScrollableElem.scrollTop = scrollTop;
    }
  };
}

export const taskPageController = new TaskPageController();
