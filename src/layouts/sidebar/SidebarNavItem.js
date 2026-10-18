import { Icon } from "../../components";
import { cnBEM, createElement } from "../../utils";

export const SidebarNavItem = ({ id, icon, label, isActive, onClick }) => {
  return createElement("button", {
    className: cnBEM("app-sidebar__item", "active", isActive),
    attributes: {
      type: "button",
      "data-route": id,
    },
    events: {
      click: () => onClick?.(id),
    },
    children: [
      Icon({ name: icon }),
      createElement("span", {
        className: "app-sidebar__item-label",
        textContent: label,
      }),
    ],
  });
};
