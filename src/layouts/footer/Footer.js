import { cnBEM, createElement } from "../../utils";
import "./footer.css";

export const Footer = (props = {}) => {
  const navItems = [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "tasks", label: "Tasks", icon: "list-todo" },
    { id: "favorites", label: "Favorites", icon: "star" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const currentActive = props.activeRoute || "dashboard";
  const buttons = navItems.map((item) => {
    const isActive = item.id === currentActive;

    return createElement("button", {
      className: cnBEM("app-footer__btn", "active", isActive),
      events: props.onNavigate
        ? { click: () => props.onNavigate(item.id) }
        : null,
      children: [
        createElement("i", {
          attributes: { "data-lucide": item.icon },
        }),
        createElement("span", { textContent: item.label }),
      ],
    });
  });

  return createElement("nav", {
    className: "app-footer",
    children: buttons,
  });
};
