import "./sidebar.css";
import { createElement } from "../../utils";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";

export const Sidebar = ({ menuItems, activeId, user, onNavigate } = {}) => {
  return createElement("nav", {
    className: "app-sidebar",
    children: [
      SidebarNav({
        items: menuItems,
        activeId: activeId,
        onNavigate: onNavigate,
      }),

      SidebarFooter({ user }),
    ],
  });
};
