import { Button } from "../../../../components";
import { SEARCH_TEXTS } from "../../../../constants";
import { createElement } from "../../../../utils";
import { getSuggestionLabel,  } from "../../config/searchConfig";

export const SearchSuggestions = ({
  suggestions = [],
  query = "",
  onSelect,
} = {}) => {
  if (!suggestions.length) return null;

  const titleText = query
    ? SEARCH_TEXTS.autoCompleteTitle
    : SEARCH_TEXTS.suggestionsTitle;

  const header = createElement("div", {
    className: "search-suggestions__header",
    children: [
      createElement("h2", {
        className: "search-suggestions__title",
        textContent: titleText,
      }),
    ],
  });

  const listItems = suggestions.map((item) => {
    const label = getSuggestionLabel(item);

    return Button({
      text: label,
      icon: query ? "search" : "clock",
      variant: "ghost",
      className: "search-suggestions__item",
      events: {
        click: () => onSelect?.(label),
      },
    });
  });

  return createElement("div", {
    className: "search-suggestions",
    children: [
      header,
      createElement("div", {
        className: "search-suggestions__list",
        children: listItems,
      }),
    ],
  });
};
