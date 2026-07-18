import { cnBEM, createElement } from "../../utils";
import "./chip.css";

export const Chip = (props = {}) => {
  const isSelected = !!props.selected;

  const children = [
    props.icon
      ? createElement("i", { attributes: { "data-lucide": props.icon } })
      : null,
    createElement("span", { textContent: props.label }),
    props.onClose
      ? createElement("button", {
          className: "chip__close--btn",
          events: {
            click: (e) => {
              e.stopPropagetion();
              props.onClose();
            },
          },
          children: createElement("i", {
            attributes: {
              "data-lucide": "x",
              style: "width: 12px; height: 12px",
            },
          }),
        })
      : null,
  ].filter(Boolean);

  return createElement("button", {
    className:
      cnBEM("chip", "selected", isSelected) + ` ${props.className || ""}`,
    events: props.onClick ? { click: props.onClick } : null,
    children,
  });
};
