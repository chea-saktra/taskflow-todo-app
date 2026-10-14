export class ArchiveStateStore {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.searchQuery = "";
    this.selectedIds = [];
    this.sortBy = "updatedAt";
    this.sortOrder = "desc";
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  setSort(sortBy, sortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }

  toggleSelectTask(taskId) {
    if (!taskId) return;
    this.selectedIds = this.selectedIds.includes(taskId)
      ? this.selectedIds.filter((id) => id !== taskId)
      : [...this.selectedIds, taskId];
  }

  setSelectedIds(ids = []) {
    this.selectedIds = ids;
  }

  removeSelectedId(taskId) {
    this.selectedIds = this.selectedIds.filter((id) => id !== taskId);
  }

  clearSelection() {
    this.selectedIds = [];
  }
}
