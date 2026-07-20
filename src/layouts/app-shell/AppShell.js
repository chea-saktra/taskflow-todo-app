import "./app-shell.css";
import { createElement } from "../../utils";

export const AppShell = (props = {}) => {
  const header = createElement("header", {
    className: "app-shell__header flex items-center px-md",
    children: props.headerContent,
  });

  const sidebar = createElement("aside", {
    className: `app-shell__sidebar ${props.isSidebarOpen ? "is-open" : ""}`,
    children: props.sidebarContent,
  });

  const overlay = createElement("div", {
    className: `app-shell__overlay ${props.isSidebarOpen ? "is-open" : ""}`,
    events: props.onOverlayClick ? { click: props.onOverlayClick } : null,
  });
  const contentWrapper = createElement("div", {
    className: "app-shell__content",
    children: props.mainContent,
  });

  const main = createElement("main", {
    className: "app-shell__main",
    children: contentWrapper,
  });

  const footer = createElement("footer", {
    className: "app-shell__footer py-sm",
    children: props.footerContent,
  });

  const shell = createElement("div", {
    className: "app-shell",
    children: [header, sidebar, overlay, main, footer],
  });

  return shell;
};
