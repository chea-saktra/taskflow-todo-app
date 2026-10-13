import { settingsService } from "../../settings/service/SettingsService";

export class TaskStateStore {
  constructor() {
    this.resetState();
  }

  resetState() {
    const prefs = settingsService.getTaskPreferences() || {};

    this.searchQuery = "";
    this.filters = {
      keyword: "",
      category: "all",
      priority: "all",
      status: "all",
    };
    this.currentView = prefs.defaultView || "all";
    this.sortBy = prefs.defaultSortBy || "createdAt";
    this.sortOrder = prefs.defaultSortOrder || "desc";
    
    this.selectedIds = [];
    this.isSelectionMode = false;
    this.editingSubtaskId = null;
    this.modal = { open: false, mode: "create", task: null };
  }

  // Search & FIlters
  updateFilters(filters = {}) {
    this.filters = { ...this.filters, ...filters };
    this.selectedIds = [];
  }

  setSearchQuery(keyword = "") {
    this.searchQuery = keyword;
    this.updateFilters({ keyword });
  }

  setView(view = "all") {
    this.currentView = view;
    this.selectedIds = [];
  }

  setSorting(sortBy = "createdAt", sortOrder = "desc") {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }

  toggleSelectMode() {
    this.isSelectionMode = !this.isSelectionMode;
    if (!this.isSelectionMode) {
      this.selectedIds = [];
    }
  }

  // Selection Management
  toggleSelect(taskId) {
    if (!taskId) return;
    this.selectedIds = this.selectedIds.includes(taskId)
      ? this.selectedIds.filter((id) => id !== taskId)
      : [...this.selectedIds, taskId];
  }

  toggleSelectAll(allTaskIds = []) {
    if (this.selectedIds.length === allTaskIds.length) {
      this.selectedIds = [];
    } else {
      this.selectedIds = [...allTaskIds];
    }
  }

  deselect(taskId) {
    this.selectedIds = this.selectedIds.filter((id) => id !== taskId);
  }

  clearSelection() {
    this.selectedIds = [];
  }

  // Modal & Editing State
  setModal(open, mode = "create", task = null) {
    this.modal = { open, mode, task };
  }

  setEditingSubtaskId(subtaskId = null) {
    this.editingSubtaskId = subtaskId;
  }
}
