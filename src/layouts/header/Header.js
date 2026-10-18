import "./header.css";
import { createElement } from "../../utils";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { Button } from "../../components";

export const Header = ({
  title,
  icon,
  search,
  themeIcon,
  avatar,
  user,
  plan,
  onMenu,
  onSearchFocus,
  onSearchInput,
  onToggleTheme,
  onProfile,
} = {}) => {
  let isMobileSearchOpen = false;

  const left = createElement("div", {
    className: "app-header__left",
    children: [
      Button({
        variant: "ghost",
        icon: "menu",
        className: "app-header__menu-btn",
        events: { click: onMenu },
      }),
      HeaderBrand({ title, icon }),
    ],
  });

  const middle = createElement("div", {
    className: "app-header__middle",
    children: HeaderSearch({
      id: "desktop-search-input",
      value: search,
      onFocus: onSearchFocus,
      onInput: onSearchInput,
    }),
  });

  // Search Bar Mobile
  const mobileSearchWrapper = createElement("div", {
    className: "app-header__mobile-search-wrapper",
    children: [
      HeaderSearch({
        value: search,
        onFocus: onSearchFocus,
        onInput: onSearchInput,
      }),
      Button({
        variant: "ghost",
        icon: "x",
        className: "app-header__close-search-btn",
        events: {
          click: () => toggleMobileSearch(false),
        },
      }),
    ],
  });

  const toggleMobileSearch = (isOpen) => {
    isMobileSearchOpen = isOpen;
    container.classList.toggle("app-header--search-active", isMobileSearchOpen);

    if (isOpen) {
      onSearchFocus?.();
      setTimeout(() => {
        const input = container.querySelector(
          ".app-header__mobile-search-wrapper input",
        );
        input?.focus();
      }, 50);
    }
  };

  const right = HeaderActions({
    themeIcon,
    avatar,
    name: user,
    plan,
    onSearch: () => toggleMobileSearch(true),
    onTheme: onToggleTheme,
    onProfile,
  });

  const container = createElement("div", {
    className: "app-header",
    children: [left, middle, right, mobileSearchWrapper],
  });

  return container;
};
