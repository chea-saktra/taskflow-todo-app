import { cnBEM, createElement } from "../../../utils";
import "./checkbox.css";

export const Checkbox = ({
  id = "",
  name = "",
  checked = false,
  disabled = false,
  label = "",
  className = "",
  attributes = {},
  events = {},
  onChange,
} = {}) => {
  const checkboxId =
    id || name || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  // Native Input Element
  const input = createElement("input", {
    className: "checkbox__input",
    attributes: {
      type: "checkbox",
      id: checkboxId,
      ...(checked && { checked: true }),
      ...(disabled && { disabled: true }),
      ...attributes,
    },
    events: {
      ...events,
      change: (e) => {
        e.stopPropagation();
        events.change?.(e);
        onChange?.(e);
      },
      click: (e) => {
        e.stopPropagation();
        events.change?.(e);
        onChange?.(e);
      },
    },
  });

  // Costom Check Indicator (Lucide Icon)
  const indicator = createElement("span", {
    className: "checkbox__indicator",
    children: createElement("i", {
      attributes: {
        "data-lucide": "check",
      },
    }),
  });

  // Text Label
  const labelText = label
    ? createElement("span", {
        className: "checkbox__label",
        textContent: label,
      })
    : null;

  const checkboxClass = [
    "checkbox",
    cnBEM("checkbox", "disabled", disabled),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement("label", {
    className: checkboxClass,
    attributes: {
      for: checkboxId,
    },
    children: [input, indicator, labelText].filter(Boolean),
  });
};
