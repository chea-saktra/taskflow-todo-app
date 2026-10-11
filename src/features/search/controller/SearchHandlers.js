import { ConfirmModal } from "../../../components/overlays/confirm-modal/ConfirmModal";
import { routerService } from "../../../services";
import { taskPageController } from "../../tasks/controller/TaskPageController";
import { searchService } from "../service/SearchService";

export class SearchHandlers {
  constructor(stateStore, renderFn, updateResultsFn) {
    this.store = stateStore;
    this.render = renderFn;
    this.updateResultsList = updateResultsFn;
  }

  #executeAction(actionFn, ...args) {
    const results = actionFn.apply(searchService, args);
    this.store.setResults(results);
    this.render();
  }

  //   Search Input Actions
  handleSearch = (query = "") => {
    this.store.setQuery(query);

    const results = searchService.search(query);
    this.store.setResults(results);

    if (this.updateResultsList) {
      this.updateResultsList();
    } else {
      this.render();
    }
  };

  handleQueryChange = (e) => {
    const query = e.target?.value ?? e;
    this.store.setQuery(query);

    if (query.trim()) {
      const suggestions = searchService.getSuggestions(query);
      this.store.setSuggestions(suggestions);
    } else {
      this.store.setSuggestions([]);
      this.store.setResults([]);
    }
    this.render();
  };

  // Task Card Item Actions

  handleToggleTask = (taskId) => {
    this.#executeAction(searchService.toggleCompleted, taskId);
  };

  handleToggleFavorite = (taskId) => {
    this.#executeAction(searchService.toggleFavorite, taskId);
  };

  handleAcrchiveTask = (taskId) => {
    this.#executeAction(searchService.toggleArchive, taskId);
  };

  handleDeleteTask = (taskId) => {
    const modal = ConfirmModal({
      onConfirm: () => {
        this.#executeAction(searchService.deleteTask, taskId);
        document.body.removeChild(modal);
      },
      onCancel: () => {
        document.body.removeChild(modal);
      },
    });
    document.body.appendChild(modal);
  };

  handleSelectTask = (task) => {
    routerService.navigate("tasks");
    setTimeout(() => {
      taskPageController.handlers.handleOpenDetailModal(task);
    }, 100);
    this.handleClearSearch();
  };

  //   Filter Actions
  #setFilter(filterFn, value) {
    filterFn.call(this.store, value);
    this.render();
  }
  handleFilterCategory = (category) => {
    this.#setFilter(this.store.setFilterCategory, category);
  };

  handleFilterPriority = (priority) => {
    this.#setFilter(this.store.setFilterPriority, priority);
  };

  handleFilterStatus = (status) => {
    this.#setFilter(this.store.setFilterStatus, status);
  };

  handleClearSearch = () => {
    searchService.clear();
    this.store.resetState();
    const headerInput = document.querySelector(".app-header__search-input");
    if (headerInput) {
      headerInput.value = "";
    }
    this.render();
  };
}
