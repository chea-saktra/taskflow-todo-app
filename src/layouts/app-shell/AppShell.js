import "./app-shell.css";
import { createElement } from "../../utils";

export const AppShell = ({
  headerContent,
  sidebarContent,
  toolbar = null,
  mainContent,
  footerContent,
  isSidebarOpen = false,
  onOverlayClick,
}) => {
  return createElement("div", {
    className: "app-shell",
    children: [
      createElement("header", {
        className: "app-shell__header",
        children: headerContent,
      }),

      createElement("aside", {
        className: `app-shell__sidebar ${isSidebarOpen ? "is-open" : ""}`,
        children: sidebarContent,
      }),

      createElement("div", {
        className: `app-shell__overlay ${isSidebarOpen ? "is-open" : ""}`,
        events: { click: onOverlayClick },
      }),

      createElement("main", {
        className: "app-shell__main",
        children: [
          toolbar &&
            createElement("div", {
              className: "app-shell__toolbar",
              children: toolbar,
            }),
          createElement("section", {
            className: "app-shell__content",
            children: mainContent,
          }),
        ].filter(Boolean),
      }),

      createElement("footer", {
        className: "app-shell__footer",
        children: footerContent,
      }),
    ],
  });
};
