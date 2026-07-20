import { AppShell } from "./layouts/app-shell/AppShell";
import { Footer } from "./layouts/footer/Footer";
import { Header } from "./layouts/header/Header";
import { Sidebar } from "./layouts/sidebar/Sidebar";
import { Toolbar } from "./layouts/toolbar/Toolbar";
import { Router } from "./router/router";
import { routerState } from "./state/router";
import { uiState } from "./state/ui";
import { createElement, select } from "./utils";
import { DashboardView } from "./views/dashboard/Dashboard";
import { TasksView } from "./views/tasks/Tasks";

export const initApp = () => {
  const app = document.querySelector("#app");
  if (!app) return;

  const render = () => {
    app.innerHTML = "";

    const currentRoute = routerState.getRoute();

    const headerContent = Header({
      title: "TaskFlow",
      onMenuClick: () => uiState.toggleSidebar(),
      onNotificationClick: () => alert("NotificationClicks clicked!"),
      onProfileClick: () => alert("Profile clicked!"),
    });

    const sidebarContent = Sidebar({
      activeId: currentRoute,
      onNavigate: (routeId) => {
        routerState.navigate(routeId);
        uiState.toggleSidebar();
      },
    });

    const toolbarComponent = Toolbar({
      searchPlaceholder: "Search task...",
      onSearch: (value) => console.log("Searching:", value),
      onFilterChange: (status) => console.log("Filter changed:", status),
      onSortChange: (sort) => console.log("Sort changed:", sort),
    });

    const footerContent = Footer({
      activeRoute: currentRoute,
      onNavigate: (routeId) => routerState.navigate(routeId),
    });

    const appShellLayout = AppShell({
      isSidebarOpen: uiState.isOpen(),
      headerContent: headerContent,
      sidebarContent: sidebarContent,
      mainContent: Router(),
      footerContent: footerContent,
      onOverlayClick: () => {
        uiState.toggleSidebar();
      },
    });

    app.append(appShellLayout);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  routerState.subscribe(() => render());

  uiState.subscribe((isOpen) => {
    const sidebarEl = select(".app-shell__sidebar");
    const overlayEl = select(".app-shell__overlay");
    if (sidebarEl && overlayEl) {
      sidebarEl.classList.toggle("is-open", isOpen);
      overlayEl.classList.toggle("is-open", isOpen);
    }
  });

  render();
};
