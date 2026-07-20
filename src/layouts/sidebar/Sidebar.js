import "./sidebar.css";
import { cnBEM, createElement } from "../../utils";

export const Sidebar = (props = {}) => {
  const activeId = props.activeId || "dashboard";
  const onNavigate = props.onNavigate;

  const menuItems = props.items || [
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
    { id: "today", label: "Today", icon: "calendar" },
    { id: "upcoming", label: "Upcoming", icon: "calendar-days" },
    { id: "tasks", label: "My Tasks", icon: "list-todo" },
    { id: "completed", label: "Completed", icon: "check-circle" },
    { id: "favorites", label: "Favorites", icon: "star" },
    { id: "archive", label: "Archive", icon: "archive" },
  ];

  const categories = [
    { id: "cat-work", label: "Work", color: "blue" },
    { id: "cat-study", label: "Study", color: "green" },
    { id: "cat-personal", label: "Personal", color: "purple" },
    { id: "cat-shopping", label: "Shopping", color: "orange" },
  ];

  const createNavItem = (item, isCategory = false) => {
    const isActive = activeId === item.id;
    const children = [];

    if (isCategory) {
      children.push(
        createElement("span", {
          className: `app-sidebar__dot app-sidebar__dot--${item.color}`,
        }),
      );
    } else {
      children.push(
        createElement("i", { attributes: { "data-lucide": item.icon } }),
      );
    }

    children.push(
      createElement("span", {
        className: "app-sidebar__item-label",
        textContent: item.label,
      }),
    );

    return createElement("button", {
      className: cnBEM("app-sidebar__item", "active", isActive),
      events: onNavigate ? { click: () => onNavigate(item.id) } : null,
      children: children,
    });
  };

  return createElement("nav", {
    className: "app-sidebar",
    children: [
      createElement("div", {
        className: "app-sidebar__header mb-lg",
        children: [
          createElement("i", {
            className: "app-sidebar__logo-icon",
            attributes: { "data-lucide": "check-square" },
          }),
          createElement("span", {
            className: "app-sidebar__logo-text",
            textContent: "TaskFlow",
          }),
        ],
      }),

      createElement("ul", {
        className: "app-sidebar__nav",
        children: menuItems.map((item) => createNavItem(item, false)),
      }),

      createElement("hr", { className: "app-sidebar__divider" }),

      createElement("div", {
        className: "app-sidebar__categories",
        children: [
          createElement("h3", {
            className: "app-sidebar__title mb-xs",
            textContent: "Categories",
          }),
          createElement("ul", {
            className: "app-sidebar__nav",
            children: categories.map((cat) => createNavItem(cat, true)),
          }),
        ],
      }),
      createElement("div", {
        className: "app-sidebar__footer",
        children: createElement("ul", {
          className: "app-sidebar__nav",
          children: [
            createNavItem(
              { id: "settings", label: "Settings", icon: "settings" },
              false,
            ),
          ],
        }),
      }),
    ],
  });
};
