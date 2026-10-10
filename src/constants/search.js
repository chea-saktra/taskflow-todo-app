import { FILTER_OPTIONS } from "../features/tasks/config/taskConfig";

export const SEARCH_TEXTS = {
  title: "Search Results",
  suggestionsTitle: "Recent Searches",
  autoCompleteTitle: "Suggestions",
  onResultsTitle: "No results found",
  onResultsDesc: (query) => `No tasks found for "${query}".`,
  initialTitle: "Search tasks",
  initialDesc: "Start typing to search your tasks.",
};

export const SEARCH_FILTERS_CONFIG = [
  { key: "category", options: FILTER_OPTIONS.categories },
  { key: "priority", options: FILTER_OPTIONS.priorities },
  { key: "status", options: FILTER_OPTIONS.statuses },
];