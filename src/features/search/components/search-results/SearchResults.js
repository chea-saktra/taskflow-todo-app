import "./search-results.css";
import { createElement } from "../../../../utils";
import { getResultCountText } from "../../config/searchConfig";
import { SearchTaskCard } from "../search-task-card/SearchTaskCard";
import { SEARCH_TEXTS } from "../../../../constants";

export const SearchResults = ({
  query = "",
  results = [],
  onToggle,
  onFavorite,
  onArchive,
  onDelete,
  onClick,
} = {}) => {
  const header = createElement("div", {
    className: "search-results__header",
    children: [
      createElement("div", {
        className: "search-results__heading",
        children: [
          createElement("h2", {
            className: "search-results__title",
            textContent: SEARCH_TEXTS.title,
          }),
          createElement("p", {
            className: "search-results__count",
            textContent: getResultCountText(results.length),
          }),
        ],
      }),
      query &&
        createElement("span", {
          className: "search-results__query",
          textContent: `"${query}"`,
        }),
    ].filter(Boolean),
  });

  const list = createElement("div", {
    className: "search-results__list",
    children: results.map((task) =>
      SearchTaskCard({
        task,
        onToggle,
        onFavorite,
        onArchive,
        onDelete,
        onClick,
      }),
    ),
  });

  return createElement("section", {
    className: "search-results",
    children: [header, list],
  });
};
