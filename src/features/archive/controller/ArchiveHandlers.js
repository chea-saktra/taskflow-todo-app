import { archiveService } from "../service/ArchiveService";

export class ArchivedHandlers {
  constructor(store, renderFn, updateListFn) {
    this.store = store;
    this.render = renderFn;
    this.updateList = updateListFn;
  }

  //   Search & Sort
  handleSearch = (query = "") => {
    this.store.setSearchQuery(query);
    this.updateList();
  };

  handleSortChange = (sortBy = "updatedAt", sortOrder = "desc") => {
    this.store.setSort(sortBy, sortOrder);
    this.render();
  };

  //   Selection
  handleSelect = (taskId) => {
    this.store.toggleSelectTask(taskId);
    this.render();
  };

  handleSelectAll = (visibleTasks = []) => {
    const ids = visibleTasks.map((task) => task.id);
    const allSelected =
      ids.length > 0 && ids.every((id) => this.store.selectedIds.includes(id));

    this.store.setSelectedIds(allSelected ? [] : ids);
    this.render();
  };

  //   Restore Operations
  handleRestore = (taskId) => {
    if (!taskId) return;
    archiveService.unarchive(taskId);
    this.store.remvoSelectedId(taskId);
    this.render();
  };

  handleRestoreSelected = () => {
    if (!this.store.selectedIds.length) return;
    archiveService.restoreMany(this.store.selectedIds);
    this.store.clearSelection();
    this.render();
  };

  //   Delete Operations
  handleDelete = (taskId) => {
    if (!taskId) return;
    archiveService.delete(taskId);
    this.store.remvoSelectedId(taskId);
    this.render();
  };

  handleDeleteSelected = () => {
    if (!this.store.selectedIds.length) return;
    archiveService.deleteMany(this.store.selectedIds);
    this.store.clearSelection();
    this.render();
  };

  handleDeleteAll = () => {
    archiveService.deleteAll();
    this.store.clearSelection();
    this.render();
  };
}
