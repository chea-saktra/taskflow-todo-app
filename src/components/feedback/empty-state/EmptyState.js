import { createElement } from "../../../utils";
import "./empty-state.css";

export const EmptyState = ({
  icon = "inbox",
  title = "Nothing here",
  description = "",
  actionLabel = "",
  actionIcon = "plus",
  onAction,
} = {}) => {
  const children = [
    createElement("div", {
      className: "empty-state__icon",
      children: createElement("i", {
        attributes: { "data-lucide": icon },
      }),
    }),

    createElement("h3", {
      className: "empty-state__title",
      textContent: title,
    }),
  ];

  if (description) {
    children.push(
      createElement("p", {
        className: "empty-state__description",
        textContent: description,
      }),
    );
  }

  if (actionLabel && actionIcon) {
    children.push(
      createElement("button", {
        className: "empty-state__action",
        attributes: { type: "button" },
        events: { click: onAction },
        children: [
          actionIcon
            ? createElement("i", {
                attributes: { "data-lucide": actionIcon },
              })
            : null,
          createElement("span", {
            textContent: actionLabel,
          }),
        ].filter(Boolean),
      }),
    );
  }

  return createElement("div", {
    className: "empty-state",
    children,
  });
};
