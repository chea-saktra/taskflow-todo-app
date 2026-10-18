import { cnBEM, createElement } from "../../utils";

export const FooterNavItem = ({ item, activeRoute, onNavigate }) => {
  const isActive = item.id === activeRoute;

  return createElement("button", {
    className: cnBEM("app-footer__btn", "active", isActive),
    attributes: {
      "data-route": item.id,
    },
    events: { click: () => onNavigate(item.id) },
    children: [
      createElement("div", {
        className: "app-footer__icon-wrapper",
        children: [
          createElement("i", {
            attributes: { "data-lucide": item.icon },
          }),
        ],
      }),
      createElement("span", {
        className: "app-footer__label",
        textContent: item.label,
      }),
    ],
  });
};
