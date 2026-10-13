import { Icon, Input } from "../../../../components";
import { createElement } from "../../../../utils";

export const TaskFilterSearch = ({
  value = "",
  placeholder = "Search tasks...",
  onInput,
} = {}) => {
  return createElement("div", {
    className: "task-filters__search",
    children: [
      createElement("span", {
        className: "task-filters__search-icon",
        children: [Icon({ name: "search", size: "sm" })],
      }),
      Input({
        type: "search",
        value,
        placeholder,
        attributes: { "aria-label": "Search tasks" },
        events: {
          input: (e) => onInput?.(e.target.value),
        },
      }),
    ],
  });
};
