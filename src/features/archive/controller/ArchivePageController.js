import { ArchivePage } from "../../../page/archive/Archive";
import { taskState } from "../../../state";
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
    this.subscribe();
    this.render();
  };

  subscribe = () => {
    if (typeof taskState.subscribe !== "function") {
      return;
    }

    this.unsubscribe = taskState.subscribe(() => this.render());
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

  updateArchiveList = () => {
    if (!this.container) return;

    const archiveContent = this.container.querySelector(
      ".archive-page__content",
    );
    if (!archiveContent) return;

    const tasks = this.getTasks();
    const tempPage = ArchivePage(this.getPageProps(tasks));

    const newContent = tempPage.querySelector(".archive-page__content");
    if (newContent) {
      archiveContent.replaceChildren(...newContent.childNodes);
      window.lucide?.createIcons();
    }
  };

  getPageProps = (tasks) => {
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

  render = () => {
    if (!this.container) return;

    const tasks = this.getTasks();
    const pageProps = this.getPageProps(tasks);
    const page = ArchivePage(pageProps);

    this.container.replaceChildren(page);
    window.lucide?.createIcons();
  };
}

export const archivePageController = new ArchivePageController();
