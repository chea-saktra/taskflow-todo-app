import { EmptyState } from "../../components";
import { SEARCH_TEXTS } from "../../constants";
import { searchFilter } from "../../features/search/components/search-filter/SearchFilters";
import { SearchResults } from "../../features/search/components/search-results/SearchResults";
import { SearchSuggestions } from "../../features/search/components/search-suggestions/SearchSuggestions";
import {
  getSearchViewState,
} from "../../features/search/config/searchConfig";
import { createElement } from "../../utils";
import "./search.css";

export const SearchPage = ({
  query = "",
  results = [],
  suggestions = [],

  category = "all",
  priority = "all",
  status = "all",

  onSearch,
  onClear,
  onFilterCategory,
  onFilterPriority,
  onFilterStatus,

  // Task Actions
  onToggle,
  onFavorite,
  onArchive,
  onDelete,
  onClick,
} = {}) => {
  const viewState = getSearchViewState({ query, results, suggestions });

  const viewMap = {
    SUGGESTIONS: () =>
      SearchSuggestions({
        suggestions,
        query,
        onSelect: (value) => onSearch?.(value),
      }),

    INITIAL: () =>
      EmptyState({
        icon: "search",
        title: SEARCH_TEXTS.initialTitle,
        description: SEARCH_TEXTS.initialDesc,
      }),

    EMPTY_RESULTS: () =>
      EmptyState({
        icon: "search-x",
        title: SEARCH_TEXTS.onResultsTitle,
        description: SEARCH_TEXTS.onResultsDesc(query),
        actionLabel: "Clear Search",
        actionIcon: "x",
        onAction: onClear,
      }),

    RESULTS: () =>
      SearchResults({
        query,
        results,
        onToggle,
        onFavorite,
        onArchive,
        onDelete,
        onClick,
      }),
  };
  const currentContentView = viewMap[viewState]?.() || null;

  return createElement("div", {
    className: "search-page",
    children: [
      searchFilter({
        category,
        priority,
        status,
        onFilterCategory,
        onFilterPriority,
        onFilterStatus,
      }),

      createElement("div", {
        className: "search-page__content",
        children: [currentContentView],
      }),
    ],
  });
};
