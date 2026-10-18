import { createElement } from "../../utils";

export const HeaderBrand = ({ title = "TaskFlow", icon = "check-square" }) => {
  return createElement("div", {
    className: "app-header__brand",
    children: [
      createElement("i", {
        className: "app-header__logo-icon",
        attributes: {
          "data-lucide": icon,
        },
      }),
      createElement("h1", {
        className: "app-header__brand-title",
        textContent: title,
      }),
    ],
  });
};
