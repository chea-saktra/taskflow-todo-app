import { SearchPage } from "../../../page/search/Search";
import { taskState } from "../../../state";
import { SearchHandlers } from "./SearchHandlers";
import { SearchStateStore } from "./SearchStateStore";

class SearchPageController {
  constructor() {
    this.container = null;
    this.unsubscribe = null;

    this.store = new SearchStateStore();
    this.handlers = new SearchHandlers(
      this.store,
      () => this.render(),
      () => this.updateResultsList(),
    );
  }

  mount = (container) => {
    this.container = container;
    this.unsubscribe?.();
    if (typeof taskState.subscribe === "function") {
      this.unsubscribe = taskState.subscribe(() => {
        this.render();
      });
    }

    this.render();

    return this;
  };

  unmount = () => {
    this.unsubscribe?.();
    this.unsubscribe = null;

    this.container = null;
  };

  getFilteredResults() {
    const { results, selectedCategory, selectedPriority, selectedStatus } =
      this.store;
    const filters = [
      { key: "category", value: selectedCategory },
      { key: "priority", value: selectedPriority },
      { key: "status", value: selectedStatus },
    ];

    return results.filter((item) =>
      filters.every(({ key, value }) => value === "all" || item[key] === value),
    );
  }

  getQuery = () => {
    return this.store.query;
  };

  getPageProps = () => {
    return {
      query: this.getQuery(),
      results: this.getFilteredResults(),
      suggestions: this.store.suggestions,

      category: this.store.selectedCategory,
      priority: this.store.selectedPriority,
      status: this.store.selectedStatus,

      // Bind Handlers
      onSearch: this.handlers.handleSearch,
      onClear: this.handlers.handleClearSearch,
      onFilterCategory: this.handlers.handleFilterCategory,
      onFilterPriority: this.handlers.handleFilterPriority,
      onFilterStatus: this.handlers.handleFilterStatus,

      onToggle: this.handlers.handleToggleTask,
      onFavorite: this.handlers.handleToggleFavorite,
      onArchive: this.handlers.handleAcrchiveTask,
      onDelete: this.handlers.handleDeleteTask,
      onClick: this.handlers.handleSelectTask,
    };
  };

  updateResultsList = () => {
    if (!this.container) return;

    const searchContent = this.container.querySelector(".search-page__content");
    if (!searchContent) return;

    const tempPage = SearchPage(this.getPageProps());
    const newContent = tempPage.querySelector(".search-page__content");

    if (newContent) {
      searchContent.replaceChildren(...newContent.childNodes);
      window.lucide?.createIcons();
    }
  };

  render = () => {
    if (!this.container) return;
    const page = SearchPage(this.getPageProps());

    this.container.replaceChildren(page);
    window.lucide?.createIcons();
  };
}

export const searchPageController = new SearchPageController();
