import { createElement } from "../../utils";
import { HeaderProfile } from "./HeaderProfile";

export const HeaderActions = ({
  themeIcon,
  avatar,
  name,
  plan,
  onTheme,
  onSearch,
  onNotification,
  onProfile,
}) => {
  return createElement("div", {
    className: "app-header__right",
    children: [
      createElement("button", {
        className: "app-header__icon-btn app-header__mobile-search-btn",
        events: { click: onSearch },
        children: [
          createElement("i", { attributes: { "data-lucide": "search" } }),
        ],
      }),
      createElement("button", {
        className: "app-header__icon-btn app-header__theme-btn",
        events: { click: onTheme },
        children: [
          createElement("i", { attributes: { "data-lucide": themeIcon } }),
        ],
      }),
      createElement("button", {
        className: "app-header__icon-btn app-header__bell-btn",
        events: { click: onNotification },
        children: [
          createElement("i", { attributes: { "data-lucide": "bell" } }),
        ],
      }),

      HeaderProfile({
        avatar,
        name,
        plan,
        onClick: onProfile,
      }),
    ],
  });
};
