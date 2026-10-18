import { createElement } from "../../utils";

export const HeaderProfile = ({ avatar, name, plan, onClick }) => {
  return createElement("div", {
    className: "app-header__profile",
    events: {
      click: onClick,
    },
    children: [
      createElement("img", {
        className: "app-header__avatar",
        attributes: {
          src: avatar,
          alt: name,
        },
      }),
      createElement("div", {
        className: "app-header__user-info",
        children: [
          createElement("span", {
            className: "app-header__user-name",
            textContent: name,
          }),
          createElement("span", {
            className: "app-header__user-plan",
            textContent: plan,
          }),
        ],
      }),
    ],
  });
};
