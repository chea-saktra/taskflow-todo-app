import {
  broadcastOpen,
  cnBEM,
  createElement,
  setupOtherOpenListener,
  setupOutsideClick,
} from "../../../utils";
import "./dropdown.css";

export const Dropdown = ({
  trigger,
  items = [],
  align = "left",
  className = "",
} = {}) => {
  const menu = createElement("div", {
    className: `dropdown__menu dropdown__menu--${align}`,
  });

  const wrapper = createElement("div", {
    className: `dropdown ${className}`,
    children: [trigger, menu],
  });

  let isOpen = false;
  let removeOutsideClick = null;
  let removeOtherOpen = null;

  const close = () => {
    isOpen = false;
    menu.classList.remove("is-open");
    removeOutsideClick?.();
    removeOtherOpen?.();
  };

  const open = () => {
    broadcastOpen("ui:menu-open", wrapper);
    isOpen = true;
    menu.classList.add("is-open");

    removeOutsideClick = setupOutsideClick(wrapper, close);
    removeOtherOpen = setupOtherOpenListener("ui:menu-open", wrapper, close);
    window.lucide?.createIcons();
  };


  const toggle = (e) => {
    e.stopPropagation();
    if (isOpen) {
      close();
    } else {
      open();
    }
  };


  if (trigger instanceof HTMLElement) {
    trigger.addEventListener("click", toggle);
  }

  menu.innerHTML = "";
  items.forEach((item) => {
    const button = createElement("button", {
      className: cnBEM("dropdown__item", "danger", item.isDanger),
      attributes: { type: "button" },
      events: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          close();
          item.onClick?.();
        },
      },
      children: [
        item.icon
          ? createElement("i", {
              attributes: { "data-lucide": item.icon },
            })
          : null,

        createElement("span", {
          className: "dropdown__label",
          textContent: item.label,
        }),
      ].filter(Boolean),
    });
    menu.append(button);
  });

  return wrapper;
};
