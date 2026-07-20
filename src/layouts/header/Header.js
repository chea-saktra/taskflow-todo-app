import "./header.css";
import { createElement } from "../../utils";
import { InputField } from "../../components/input/Input";

export const Header = (props = {}) => {
  const letfSection = createElement("div", {
    className: "app-header__left",
    children: [
      createElement("button", {
        className: "app-header__menu-btn",
        children: createElement("i", { attributes: { "data-lucide": "menu" } }),
        events: props.onMenuClick ? { click: props.onMenuClick } : null,
      }),
      createElement("div", {
        className: "app-header__brand",
        children: [
          createElement("div", {
            className: "app-header__logo-icon",
            children: createElement("i", {
              attributes: { "data-lucide": "check-circle" },
            }),
          }),
          createElement("h1", {
            className: "app-header__title",
            textContent: props.title || "TaskFlow",
          }),
        ],
      }),
    ],
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
        createElement("input", {
          className: "app-header__search-input",
          attributes: {
            type: "text",
            placeholder: props.searchPlaceholder || "Search task...",
          },
          events: props.onSearch
            ? { input: (e) => props.onSearch(e.target.value) }
            : null,
        }),
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
      createElement("button", {
        className: "app-header__icon-btn app-header__theme-btn",
        events: props.onThemeToggle ? { click: props.onThemeToggle } : null,
        children: createElement("i", { attributes: { "data-lucide": "moon" } }),
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

  const header = createElement("header", {
    className: "app-header",
    children: [letfSection, middleSection, actions],
  });

  return header;
};
