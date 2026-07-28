import { searchState } from "../../state/search";

export const SearchController = {
  setQuery(query) {
    searchState.setSearchQuery(query);
  },

  clear() {
    searchState.clearSearch();
  },

  applySearch(tasks = [], activeTab = "all") {
    const rawQuery = searchState.getSearchQuery().toLowerCase().trim();
    if (!rawQuery) return tasks;
    const queryWords = rawQuery.split(/\s+/);

    return tasks.filter((task) => {
      const matchTitle = (text) =>
        (task.title || "").toLowerCase().includes(text);
      const matchDesc = (text) =>
        (task.description || "").toLowerCase().includes(text);
      const matchSubtasks = (text) =>
        task.subtasks?.some((st) =>
          (st.title || "").toLowerCase().includes(text),
        ) ?? false;

      if (activeTab === "title") {
        return queryWords.every((word) => matchTitle(word));
      }
      if (activeTab === "description") {
        return queryWords.every((word) => matchDesc(word));
      }
      if (activeTab === "subtasks") {
        return queryWords.every((word) => matchSubtasks(word));
      }

      return queryWords.every(
        (word) => matchTitle(word) || matchDesc(word) || matchSubtasks(word),
      );
    });
  },
};
