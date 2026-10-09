import { createElement, cnBEM } from "../../../utils";
import "./chip.css";

export const Chip = ({
  label = "",
  icon = null,
  selected = false,
  variant = "",
  id = "",
  className = "",
  onClick = null,
} = {}) => {
  const isSelected = Boolean(selected);
  const optId = id ? String(id).toLowerCase() : "";

  const children = [
    icon ? createElement("i", { attributes: { "data-lucide": icon } }) : null,
    createElement("span", { textContent: label }),
  ].filter(Boolean);

  let chipClasses = cnBEM("chip", "selected", isSelected);
  if (variant) chipClasses += ` chip--${variant}`;
  if (optId) chipClasses += ` chip--id-${optId}`;
  if (className) chipClasses += ` ${className}`;

  return createElement("button", {
    className: chipClasses,
    attributes: {
      type: "button",
      "data-id": optId,
      "data-variant": variant,
    },
    events: onClick ? { click: onClick } : null,
    children,
  });
};
