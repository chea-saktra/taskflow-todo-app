import { ArchivePage } from "../../../page/archive/Archive";
import { taskState } from "../../../state";
import { select } from "../../../utils";
import { archiveService } from "../service/ArchiveService";
import { ArchivedHandlers } from "./ArchiveHandlers";
import { ArchiveStateStore } from "./ArchiveStateStore";

class ArchivePageController {
  constructor() {
    this.container = null;
    this.unsubscribe = null;

    this.store = new ArchiveStateStore();
    this.handlers = new ArchivedHandlers(
      this.store,
      () => this.render(),
      () => this.updateArchiveList(),
    );
  }

  mount = (container) => {
    this.container = container;
    if (typeof taskState.subscribe === "function") {
      this.unsubscribe = taskState.subscribe(() => this.render());
    }
    this.render();
    return this;
  };

  unmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.container = null;
  };

  getTasks = () => {
    return archiveService.getFilteredAndSortedTasks(
      this.store.searchQuery,
      this.store.sortBy,
      this.store.sortOrder,
    );
  };

  getPageProps = () => {
    const tasks = this.getTasks();
    return {
      tasks,
      search: this.store.searchQuery,
      sortBy: this.store.sortBy,
      sortOrder: this.store.sortOrder,
      selectedIds: this.store.selectedIds,

      onSearch: this.handlers.handleSearch,
      onSortChange: this.handlers.handleSortChange,
      onSelect: this.handlers.handleSelect,
      onSelectAll: () => this.handlers.handleSelectAll(tasks),
      onRestore: this.handlers.handleRestore,
      onRestoreSelected: this.handlers.handleRestoreSelected,
      onDelete: this.handlers.handleDelete,
      onDeleteSelected: this.handlers.handleDeleteSelected,
      onDeleteAll: this.handlers.handleDeleteAll,
    };
  };

  updateArchiveList = () => {
    if (!this.container) return;

    const contentEl = select(".archive-page__content", this.container);
    if (!contentEl) return;

    const tempPage = ArchivePage(this.getPageProps());
    const newContent = select(".archive-page__content", tempPage);
    if (newContent) {
      contentEl.replaceChildren(...newContent.childNodes);
      window.lucide?.createIcons();
    }
  };

  render = () => {
    if (!this.container) return;

    const page = ArchivePage(this.getPageProps());
    this.container.replaceChildren(page);
    window.lucide?.createIcons();
  };
}

export const archivePageController = new ArchivePageController();
