import { GlobalLoader, ToastContainer } from "./components";
import {
  CURRENT_USER,
  FOOTER_ITEMS,
  ROUTE_ICON,
  ROUTE_TITLE,
  SIDEBAR_NAV_ITEMS,
} from "./constants";
import { searchPageController } from "./features/search/controller/SearchPageController";
import { settingsService } from "./features/settings/service/SettingsService";
import { taskService } from "./features/tasks/services/TaskService";
import { AppShell, Footer, Header, Sidebar } from "./layouts";
import { router } from "./router/Router";
import { routerService, themeService } from "./services";
import {
  loadingState,
  notificationState,
  searchState,
  themeState,
  uiState,
} from "./state";
import { createElement, select, selectAll } from "./utils";

export const initApp = () => {
  const app = document.querySelector("#app");
  if (!app) return;

  // Initialize application services
  settingsService.initialize();
  taskService.initialize();
  themeService.init();

  // Main App Render Function
  const renderApp = (currentRoute) => {
    const header = Header({
      title: ROUTE_TITLE[currentRoute] || ROUTE_TITLE.dashboard,
      icon: ROUTE_ICON[currentRoute] || ROUTE_ICON.dashboard,
      search: searchState.getQuery(),
      themeIcon: themeState.getTheme() === "dark" ? "sun" : "moon",
      avatar: CURRENT_USER.avatar,
      user: CURRENT_USER.name,
      plan: CURRENT_USER.plan,
      onMenu: () => uiState.toggleSidebar(),
      onSearchFocus: () => routerService.navigate("search"),
      onSearchInput: (e) =>
        searchPageController.handlers.handleSearch(e.target.value),
      onToggleTheme: () => {
        const currentTheme = themeService.getCurrentTheme();
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        settingsService.updateAppearance({ theme: nextTheme });
      },
      onProfile: () => {},
    });

    // Sidebar
    const sidebar = Sidebar({
      activeId: currentRoute,
      user: CURRENT_USER,
      menuItems: SIDEBAR_NAV_ITEMS,
      onNavigate: (routeId) => {
        routerService.navigate(routeId);
        uiState.closeSidebar();
      },
    });

    // Footer
    const footer = Footer({
      activeRoute: currentRoute,
      onNavigate: (routeId) => routerService.navigate(routeId),
      items: FOOTER_ITEMS,
    });

    // App Shell
    const appShellLayout = AppShell({
      isSidebarOpen: uiState.isSidebarOpen(),
      headerContent: header,
      sidebarContent: sidebar,
      mainContent: "",
      footerContent: footer,
      onOverlayClick: () => uiState.closeSidebar(),
    });

    // Mount App Shell if not already mounted
    if (!select(".app-shell", app)) {
      app.replaceChildren(appShellLayout);
      app.append(ToastContainer());
      app.append(GlobalLoader({ visible: loadingState.isLoading() }));
    } else {
      // Update Header Title & Icon dynamically
      const titleEl = select(".app-header__brand-title", app);
      if (titleEl) titleEl.textContent = ROUTE_TITLE[currentRoute];
    }

    // Update Sidebar Active State
    const sidebarItems = selectAll(".app-sidebar__item", app);
    sidebarItems.forEach((item) => {
      const route = item.getAttribute("data-route");
      if (route === currentRoute) {
        item.classList.add("app-sidebar__item--active");
      } else {
        item.classList.remove("app-sidebar__item--active");
      }
    });

    // Update Footer Active State
    const footerBtn = selectAll(".app-footer__btn", app);
    footerBtn.forEach((btn) => {
      const routeId = btn.getAttribute("data-route");
      if (routeId === currentRoute) {
        btn.classList.add("app-footer__btn--active");
      } else {
        btn.classList.remove("app-footer__btn--active");
      }
    });

    // Update Router Page Components
    const mainContent = select("main", app);
    if (mainContent) {
      router.render(mainContent);
    }
    window.lucide?.createIcons();
  };

  // Initial Route Render
  const initialRoute = routerService.getCurrentRoute();
  renderApp(initialRoute);

  // Listen to Browser URL changes via routerService
  routerService.onChange((route) => {
    renderApp(route);
  });

  // UI Subscriptions
  uiState.subscribe((isOpen) => {
    select(".app-shell__sidebar")?.classList.toggle("is-open", isOpen);
    select(".app-shell__overlay")?.classList.toggle("is-open", isOpen);
  });

  themeState.subscribe((theme) => {
    const themeIconBtn = select(".app-header__theme-btn", app);
    if (themeIconBtn) {
      const newIcon = createElement("i", {
        attributes: {
          "data-lucide": theme === "dark" ? "sun" : "moon",
        },
      });
      themeIconBtn.replaceChildren(newIcon);
      window.lucide?.createIcons();
    }
  });

  searchState.subscribe((state) => {
    const searchInputs = selectAll(".app-header__search-input", app);
    searchInputs.forEach((input) => {
      if (input.value !== state.query) {
        input.value = state.query;
      }
    });
  });

  // Loading
  loadingState.subscribe((isLoading) => {
    select(".global-loader")?.classList.toggle("is-visible", isLoading);
  });

  // Notifications
  notificationState.subscribe(() => {
    const currentToast = select(".toast-container");
    const nextToast = ToastContainer();

    if (currentToast) {
      currentToast.replaceWith(nextToast);
    } else {
      app.append(nextToast);
    }
    window.lucide?.createIcons();
  });
};
