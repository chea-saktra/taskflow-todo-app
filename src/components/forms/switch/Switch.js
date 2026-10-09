import { cnBEM, createElement } from "../../../utils";
import "./switch.css";

export const Switch = ({
  id = "",
  name = "",
  checked = false,
  disabled = false,
  label = "",
  description = "",
  className = "",
  ariaLabel,
  onChange,
  events = {},
} = {}) => {
  const switchId =
    id || name || `switch-${Math.random().toString(36).substring(2, 9)}`;

  // Native Checkbox Input Element
  const input = createElement("input", {
    className: "switch__input",
    attributes: {
      type: "checkbox",
      role: "switch",
      id: switchId,
      "aria-checked": String(checked),
      ...(name ? { name } : {}),
      ...(checked ? { checked: true } : {}),
      ...(disabled ? { disabled: true } : {}),
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    },
    events: {
      change: (event) => {
        onChange?.(event.target.checked, event);
      },
      ...events,
    },
  });

  //   Visual Track & Thumb Element
  const track = createElement("span", {
    className: "switch__track",
    children: [
      createElement("span", {
        className: "switch__thumb",
      }),
    ],
  });

  //   Toggle Control Wrapper
  const control = createElement("label", {
    className: "switch__control",
    attributes: {
      for: switchId,
    },
    children: [input, track],
  });

  //   Text Content (Label & Description)
  const content = [];

  if (label) {
    content.push(
      createElement("span", {
        className: "switch__label",
        textContent: label,
      }),
    );
  }

  if (description) {
    content.push(
      createElement("span", {
        className: "switch__description",
        textContent: description,
      }),
    );
  }

  //   Container Class Name & Wrapper
  const containerClass = [
    "switch",
    cnBEM("switch", "disabled", disabled),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement("div", {
    className: containerClass,
    children: [
      control,
      ...(content.length
        ? [
            createElement("div", {
              className: "switch__content",
              children: content,
            }),
          ]
        : []),
    ],
  });
};
