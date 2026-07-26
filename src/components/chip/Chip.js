import "./chip.css";
import { cnBEM, createElement } from "../../utils";

export const Chip = (props = {}) => {
  const isSelected = !!props.selected;
  const variant = props.variant || "";
  const optId = props.id ? String(props.id).toLowerCase() : "";

  const children = [
    props.icon
      ? createElement("i", { attributes: { "data-lucide": props.icon } })
      : null,
    createElement("span", { textContent: props.label }),
  ].filter(Boolean);

  let className = cnBEM("chip", "selected", isSelected);
  if (variant) className += ` chip--${variant}`;
  if (optId) className += ` chip--id-${optId}`;
  if (props.className) className += ` ${props.className}`;

  return createElement("button", {
    className,
    attributes: {
      type: "button",
      "data-id": optId,
      "data-variant": variant,
    },
    events: props.onClick ? { click: props.onClick } : null,
    children,
  });
};
