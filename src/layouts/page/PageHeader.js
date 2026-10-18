import { createElement } from "../../utils";

export const PageHeader = ({ title = "", subtitle = "", actions = [] }) => {
  const left = createElement("div", {
    className: "page-header__content",
    children: [
      createElement("h2", {
        className: "page-header__title",
        textContent: title,
      }),
      subtitle
        ? createElement("p", {
            className: "page-header__subtitle",
            textContent: subtitle,
          })
        : null,
    ].filter(Boolean),
  });

  const actionChildren = Array.isArray(actions)
    ? actions.filter(Boolean)
    : [actions].filter(Boolean);

  const right = createElement("div", {
    className: "page-header__actions",
    children: actionChildren,
  });

  return createElement("section", {
    className: "page-header",
    children: [left, right],
  });
};
