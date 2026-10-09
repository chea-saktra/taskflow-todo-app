import { cnBEM, createElement } from "../../../utils";
import "./button.css";

export const Button = ({
  text = "",
  icon = "",
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  attributes = {},
  events = {},
} = {}) => {
  // Child Element (Icon & Label)
  const children = [];

  if (icon) {
    children.push(
      createElement("i", {
        className: "btn__icon",
        attributes: { "data-lucide": icon },
      }),
    );
  }

  if (text) {
    children.push(
      createElement("span", {
        className: "btn__label",
        textContent: text,
      }),
    );
  }

  // Class Name
  const buttonClass = [
    "btn",
    cnBEM("btn", variant, true),
    cnBEM("btn", size, true),
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ATtributes
  const buttonAttributes = {
    type,
    ...(disabled ? { disabled: true, "aria-disabled": "true" } : {}),
    ...attributes,
  };

  return createElement("button", {
    className: buttonClass,
    attributes: buttonAttributes,
    events,
    children,
  });
};
