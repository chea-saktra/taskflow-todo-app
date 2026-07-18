import { createElement } from "../../utils/dom";
import "./dropdown.css";

export const Dropdown = (props = {}) => {
  let isOpen = false;

  const trigger = props.trigger;

  const menuItems = (props.items || []).map((item) => {
    return createElement("button", {
      className: `dropdown__item ${item.isDanger ? "dropdown__item--danger" : ""}`,
      events: {
        click: () => {
          if (item.onClick) item.onClick();
          toggleDropdown(false);
        },
      },
      children: [
        item.icon
          ? createElement("i", { attributes: { "data-lucide": item.icon } })
          : null,
        createElement("span", { textContent: item.label }),
      ].filter(Boolean),
    });
  });

  const menu = createElement("div", {
    className: "dropdown__menu",
    children: menuItems,
  });

  const toggleDropdown = (state) => {
    isOpen = state !== undefined ? state : !isOpen;
    if (isOpen) {
      menu.classList.add("dropdown__menu--show");
      document.addEventListener("click", closeOnOutsideClick);
    } else {
      menu.classList.remove("dropdown__menu--show");
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  const closeOnOutsideClick = (e) => {
    if (!dropdown.contains(e.target)) {
      toggleDropdown(false);
    }
  };

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  const dropdown = createElement("div", {
    className: "dropdow",
    children: [trigger, menu],
  });

  return dropdown;
};
