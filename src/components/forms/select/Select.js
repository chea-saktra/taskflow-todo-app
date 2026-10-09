import {
  broadcastOpen,
  cnBEM,
  createElement,
  setupOtherOpenListener,
  setupOutsideClick,
} from "../../../utils";
import "./select.css";

export const Select = ({
  id = "",
  name = "",
  value = "",
  options = [],
  placeholder = "Select an option",
  label = "",
  error = "",
  hint = "",
  disabled = false,
  required = false,
  className = "",
  onChange,
  events = {},
} = {}) => {
  let isOpen = false;
  let removeOutsideClick = null;
  let removeOtherOpen = null;

  const selectId =
    id || name || `select-${Math.random().toString(36).substring(2, 9)}`;

  const selectedOption =
    options.find((option) => option.value === value) || null;

  const selectedLabel = selectedOption?.label ?? placeholder;

  // Option List Items
  const optionElements = options.map((option) => {
    const isSelected = option.value === value;

    const optionClass = ["form-select__option", isSelected ? "is-selected" : ""]
      .filter(Boolean)
      .join(" ");

    return createElement("button", {
      className: optionClass,
      attributes: {
        type: "button",
        role: "option",
        "aria-selected": String(isSelected),
      },
      children: [
        createElement("span", {
          className: "form-select__option-label",
          textContent: option.label,
        }),
        ...(isSelected
          ? [
              createElement("i", {
                attributes: { "data-lucide": "check" },
              }),
            ]
          : []),
      ],
      events: {
        click: (event) => {
          event.stopPropagation();
          if (disabled) return;
          onChange?.(option.value);
          closeDropdown();
        },
      },
    });
  });

  // Options Dropdown Menu
  const optionsContainer = createElement("div", {
    className: "form-select__menu",
    attributes: {
      role: "listbox",
      "aria-labelledby": selectId,
    },
    children: optionElements,
  });

  // Trigger Component
  const valueLabel = createElement("span", {
    className: ["form-select__value", !selectedOption ? "is-placeholder" : ""]
      .filter(Boolean)
      .join(" "),
    textContent: selectedLabel,
  });

  const icon = createElement("i", {
    className: "form-select__icon",
    attributes: { "data-lucide": "chevron-down" },
  });

  const trigger = createElement("button", {
    className: "form-select__trigger",
    attributes: {
      type: "button",
      ...(selectId ? { id: selectId } : {}),
      ...(name ? { "data-name": name } : {}),
      "aria-haspopup": "listbox",
      "aria-expanded": "false",
      ...(disabled ? { disabled: true } : {}),
      ...(required ? { "aria-required": true } : {}),
    },
    children: [valueLabel, icon],
    events: {
      click: (event) => {
        event.stopPropagation();
        if (disabled) return;
        toggleDropdown();
      },
      ...events,
    },
  });

  // Main Select Element
  const selectClass = [
    cnBEM("form-select", "error", error),
    cnBEM("form-select", "disabled", disabled),
  ]
    .filter(Boolean)
    .join(" ");

  const selectElement = createElement("div", {
    className: selectClass,
    attributes: {
      ...(selectId ? { "data-select-id": selectId } : {}),
    },
    children: [trigger, optionsContainer],
  });

  // Dropdown Toggle Handlers
  function openDropdown() {
    broadcastOpen("ui:menu-open", selectElement);
    isOpen = true;
    selectElement.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");

    removeOutsideClick = setupOutsideClick(selectElement, closeDropdown);
    removeOtherOpen = setupOtherOpenListener(
      "ui:menu-open",
      selectElement,
      closeDropdown,
    );
  }

  function closeDropdown() {
    isOpen = false;
    selectElement.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");

    removeOutsideClick?.();
    removeOtherOpen?.();
  }

  function toggleDropdown() {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
    window.lucide?.createIcons();
  }

  // Field Wrapper (Label, Hint, Error)
  const children = [];

  if (label) {
    children.push(
      createElement("label", {
        className: "form-select__label",
        attributes: { for: selectId },
        textContent: label,
      }),
    );
  }

  children.push(selectElement);

  if (hint && !error) {
    children.push(
      createElement("span", {
        className: "form-select__hint",
        textContent: hint,
      }),
    );
  }

  if (error) {
    children.push(
      createElement("span", {
        className: "form-select__error",
        textContent: error,
        attributes: { role: "alert" },
      }),
    );
  }

  return createElement("div", {
    className: "form-select-field",
    children,
  });
};
