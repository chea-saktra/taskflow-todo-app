import "./header.css";
import { createElement } from "../../utils";
import { InputField } from "../../components/input/Input";
import { routerState } from "../../state/router";
import { Button } from "../../components/button/Button";
import { searchState } from "../../state/search";
import { SearchController } from "../../features/search/controller";

export const Header = (props = {}) => {
  const container = createElement("div", { className: "app-header" });
  const renderHeader = () => {
    container.innerHTML = "";
    const currentRoute = routerState.getRoute();
    const isSearchRoute = currentRoute === "search";

    if (isSearchRoute) {
      const activeSearchInput = createElement("input", {
        className: "app-header__search-input w-full",
        attributes: {
          type: "text",
          placeholder: "Search tasks...",
          value: searchState.getSearchQuery(),
          autofocus: "true",
        },
        events: {
          input: (e) => SearchController.setQuery(e.target.value),
        },
      });
      const searchFormHeader = createElement("div", {
        className: "app-header__search--active",
        children: [
          Button({
            variant: "ghost",
            icon: "arrow-left",
            className: "app-header__icon-btn",
            events: {
              click: () => {
                SearchController.clear();
                routerState.navigate("dashboard");
              },
            },
          }),
          createElement("div", {
            className: "app-header__search-wrapper flex-1",
            children: [
              createElement("i", {
                className: "app-header__search-icon",
                attributes: { "data-lucide": "search" },
              }),
              activeSearchInput,
            ],
          }),
          Button({
            variant: "text",
            text: "Clear",
            className: "app-header__clear-btn",
            events: {
              click: () => {
                SearchController.clear();
              },
            },
          }),
        ],
      });
      container.append(searchFormHeader);
      requestAnimationFrame(() => {
        setTimeout(() => {
          activeSearchInput.focus();
        }, 0);
      });
      return;
    }

    const leftSection = createElement("div", {
      className: "app-header__left flex items-center",
      children: [
        Button({
          variant: "ghost",
          icon: "menu",
          className: "app-header__menu-btn",
          events: props.onMenuClick ? { click: props.onMenuClick } : null,
        }),
        createElement("div", {
          className: "app-header__brand flex items-center gap-xs",
          children: [
            createElement("i", {
              attributes: { "data-lucide": "check-circle" },
            }),
            createElement("h1", {
              className: "app-header__title",
              textContent: props.title || "TaskFlow",
            }),
          ],
        }),
      ],
    });

    const searchInput = createElement("input", {
      className: "app-header__search-input",
      attributes: {
        type: "text",
        placeholder: "Search tasks...",
        value: searchState.getSearchQuery(),
      },
      events: {
        focus: () => routerState.navigate("search"),
        click: () => routerState.navigate("search"),
      },
    });

    const middleSection = createElement("div", {
      className: "app-header__middle",
      children: createElement("div", {
        className: "app-header__search-wrapper",
        children: [
          createElement("i", {
            className: "app-header__search-icon",
            attributes: { "data-lucide": "search" },
          }),
          searchInput,
        ],
      }),
    });

    const profileContainer = createElement("div", {
      className: "app-header__profile",
      events: props.onProfileClick ? { click: props.onProfileClick } : null,
      children: [
        createElement("img", {
          className: "app-header__avatar",
          attributes: {
            src:
              props.userAvatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
            alt: "User Profile",
          },
        }),
        createElement("div", {
          className: "app-header__user-info",
          children: [
            createElement("span", {
              className: "app-header__user-name",
              textContent: props.userName || "Sokchea",
            }),
            createElement("span", {
              className: "app-header__user-plan",
              textContent: props.user || "Free Plan",
            }),
          ],
        }),
      ],
    });

    const actions = createElement("div", {
      className: "app-header__right",
      children: [
        Button({
          variant: "ghost",
          icon: "search",
          className: "app-header__mobile-search-btn",
          events: {
            click: () => routerState.navigate("search"),
          },
        }),
        Button({
          variant: "ghost",
          icon: "moon",
          className: "app-header__theme",
          events: props.onThemeToggle ? { click: props.onThemeToggle } : null,
        }),
        createElement("button", {
          className: "app-header__icon-btn app-header__bell-btn",
          events: props.onNotificationClick
            ? { click: props.onNotificationClick }
            : null,
          children: [
            createElement("i", { attributes: { "data-lucide": "bell" } }),
            createElement("span", {
              className: "app-header__badge",
              textContent: "3",
            }),
          ],
        }),
        profileContainer,
      ],
    });
    container.append(leftSection, middleSection, actions);
  };

  routerState.subscribe(() => renderHeader());

  renderHeader();
  return container;
};
