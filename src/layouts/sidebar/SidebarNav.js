import { createElement } from "../../utils";
import { SidebarNavItem } from "./SidebarNavItem";

export const SidebarNav = ({ items = [], activeId, onNavigate }) => {
  return createElement("ul", {
    className: "app-sidebar__nav",
    children: items.map((item) =>
      createElement("li", {
        children: [
          SidebarNavItem({
            ...item,
            isActive: activeId === item.id,
            onClick: onNavigate,
          }),
        ],
      }),
    ),
  });
};
