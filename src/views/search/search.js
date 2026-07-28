import './search.css'
import { Chip } from "../../components/chip/Chip";
import { EmptyState } from "../../components/empty-state/EmptyState";
import { SearchController } from "../../features/search/controller";
import { renderTaskList } from "../../features/tasks/renderer";
import { routerState } from "../../state/router";
import { searchState } from "../../state/search";
import { taskState } from "../../state/task";
import { createElement } from "../../utils/dom";

export const SearchView = () => {
  const container = createElement("div", {
    className: "search-view p-md flex flex-column gap-md",
  });

  let activeTab = "all";

  const renderResults = () => {
    container.innerHTML = "";
    const query = searchState.getSearchQuery();
    const allTasks = taskState.getTasks();

    const allMatches = SearchController.applySearch(allTasks, "all");
    const titleMatches = SearchController.applySearch(allTasks, "title");
    const descMatches = SearchController.applySearch(allTasks, "description");
    const subtaskMatches = SearchController.applySearch(allTasks, "subtasks");

    const currentFilteredTasks = SearchController.applySearch(
      allTasks,
      activeTab,
    );
    const tabsData = [
      { id: "all", label: `All (${allMatches.length})` },
      { id: "title", label: `Title (${titleMatches.length})` },
      { id: "description", label: `Description (${descMatches.length})` },
      { id: "subtasks", label: `Subtasks (${subtaskMatches.length})` },
    ];

    const tabsContainer = createElement("div", {
      className: "search-view__tabs flex items-center gap-sm mb-sm",
      children: tabsData.map((tab) =>
        Chip({
          id: tab.id,
          label: tab.label,
          selected: activeTab === tab.id,
          onClick: () => {
            activeTab = tab.id;
            renderResults();
          },
        }),
      ),
    });

    container.append(tabsContainer);

    const resultCountHeader = createElement("div", {
      className: "search-view__count",
      textContent: `Results (${currentFilteredTasks.length})`,
    });

    container.append(resultCountHeader);

    if (currentFilteredTasks.length === 0) {
      const emptyView = EmptyState({
        icon: "search-x",
        title: "That's all for now",
        description: query
          ? `No matches found for "${query}" in ${activeTab}.`
          : `Try typing a keyword to search`,
      });
      container.append(emptyView);
    } else {
      const listContainer = createElement("div", {
        className: "search-view__list flex flex-column gap-sm",
      });
      renderTaskList(listContainer, currentFilteredTasks);
      container.append(listContainer);
    }
  };

  const unsubscribe = searchState.subscribe(() => renderResults());

  renderResults();

  return container;
};
