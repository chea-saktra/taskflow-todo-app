import { createElement } from "../../utils";

export const HeaderSearch = ({
  id = "search-input",
  value = "",
  placeholder = "Search...",
  onFocus,
  onInput,
}) => {
  return createElement("div", {
    className: "app-header__search-wrapper",
    children: [
      createElement("i", {
        className: "app-header__search-icon",
        attributes: {
          "data-lucide": "search",
        },
      }),
      createElement("input", {
        className: "app-header__search-input",
        attributes: {
          type: "search",
          id: id,
          name: "q",
          value,
          placeholder,
        },
        events: { focus: onFocus, input: onInput },
      }),
    ],
  });
};
