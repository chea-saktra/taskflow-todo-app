import { createElement } from "../../utils/dom";
import "./empty-state.css";

export const EmptyState = (props = {}) => {
  return createElement("div", {
    className: "empty-state",
    children: [
      createElement("div", {
        className: "empty-state__icon-wrapper",
        children: createElement("i", {
          attributes: { "data-lucide": props.icon || "folder-open" },
        }),
      }),
      createElement("h3", {
        className: "empty-state__title",
        textContent: props.title || "No Tasks Found",
      }),
      createElement("p", {
        className: "empty-state__description",
        textContent:
          props.description ||
          "Try adjusting your filters or create a new task to get started.",
      }),
      props.actionButton ? props.actionButton : null,
    ].filter(Boolean),
  });
};
