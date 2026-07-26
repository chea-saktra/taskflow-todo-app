import { cnBEM } from "../../utils";
import { createElement } from "../../utils/dom";
import "./dropdown.css";

export const Dropdown = (props = {}) => {
  let isOpen = false;
  const trigger = props.trigger;
  const align = props.align || "left";

  const menuItems = (props.items || []).map((item) => {
    const itemChildren = [];
    if (item.color) {
      itemChildren.push(
        createElement("span", {
          className: "dropdown__dot",
          attributes: { style: `background-color: ${item.color};` },
        }),
      );
    }

    if (item.icon) {
      itemChildren.push(
        createElement("i", { attributes: { "data-lucide": item.icon } }),
      );
    }

    itemChildren.push(createElement("span", { textContent: item.label }));

    return createElement("button", {
      className: cnBEM("dropdown__item", "danger", item.isDanger),
      attributes: { type: "button" },
      events: {
        click: (e) => {
          e.preventDefault();
          if (item.onClick) item.onClick();
          toggleDropdown(false);
        },
      },
      children: itemChildren,
    });
  });

  const menuClassName = cnBEM("dropdown__menu", "right", align === "right");

  const menu = createElement("div", {
    className: menuClassName,
    children: menuItems,
  });

  const handleCloseAll = () => {
    if (isOpen) {
      toggleDropdown(false);
    }
  };

  const closeOnOutsideClick = (e) => {
    if (!dropdown.contains(e.target)) {
      toggleDropdown(false);
    }
  };

  const toggleDropdown = (state) => {
    isOpen = state !== undefined ? state : !isOpen;
    let currentClass = cnBEM("dropdown__menu", "show", isOpen);
    if (align === "right") {
      currentClass += " dropdown__menu--right";
    }
    menu.className = currentClass;
    dropdown.classList.toggle("is-open", isOpen);

    if (isOpen) {
      document.dispatchEvent(new CustomEvent("close-all-dropdowns"));
      setTimeout(() => {
        document.addEventListener("click", closeOnOutsideClick, true);
      }, 0);
      document.addEventListener("close-all-dropdowns", handleCloseAll);
    } else {
      document.removeEventListener("click", closeOnOutsideClick, true);
      document.removeEventListener("close-all-dropdowns", handleCloseAll);
    }
  };

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  const dropdown = createElement("div", {
    className: "dropdown",
    children: [trigger, menu],
  });

  return dropdown;
};
