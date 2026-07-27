import { searchState } from "../../state/search";

export const SearchController = {
  setQuery(query) {
    searchState.setSearchQuery(query);
  },

  clear() {
    searchState.clearSearch;
  },

  applySearch(tasks = []) {
    const query = searchState.getSearchQuery().toLowerCase().trim();
    if (!query) return tasks;

    return tasks.filter((task) => {
      const matchTitle = task.title?.toLowerCase().includes(query);
      const matchDesc = task.description?.toLowerCase().includes(query);
      return matchTitle || matchDesc;
    });
  },
};
